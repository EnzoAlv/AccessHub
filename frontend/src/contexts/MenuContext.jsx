import { createContext, useState, useCallback } from 'react';
import menuService from '../services/menuService';
import permissionService from '../services/permissionService';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const [permissionsMap, setPermissionsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMenusByRole = useCallback(async (roleId) => {
    if (!roleId) {
      setSidebarMenus([]);
      setPermissionsMap({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [permissions, allMenus, allSubMenus] = await Promise.all([
        permissionService.getPermissionsByRole(roleId),
        menuService.getAllMenus(),
        menuService.getAllSubMenus(),
      ]);

      const safePermissions = Array.isArray(permissions) ? permissions : [];
      const safeMenus = Array.isArray(allMenus) ? allMenus : [];
      const safeSubMenus = Array.isArray(allSubMenus) ? allSubMenus : [];

      const newPermissionsMap = {};
      const menuPerms = safePermissions.filter(p => !p.subMenuId && p.canView);
      const subMenuPerms = safePermissions.filter(p => p.subMenuId && p.canView);

      const allowedMenuIds = new Set(menuPerms.map(p => p.menuId));
      const allowedSubMenuIds = new Set(subMenuPerms.map(p => p.subMenuId));

      subMenuPerms.forEach(p => allowedMenuIds.add(p.menuId));

      safePermissions.forEach(p => {
        const key = p.subMenuId ? `${p.menuId}-${p.subMenuId}` : `${p.menuId}`;
        newPermissionsMap[key] = {
          canView: !!p.canView,
          canCreate: !!p.canCreate,
          canEdit: !!p.canEdit,
          canDelete: !!p.canDelete,
        };
      });

      const builtMenus = safeMenus
        .filter(menu => allowedMenuIds.has(menu.id))
        .map(menu => {
          const subs = safeSubMenus
            .filter(sub => sub.menuId === menu.id && allowedSubMenuIds.has(sub.id))
            .map(sub => ({
              id: sub.id,
              name: sub.name,
              path: sub.path || `/${menu.name.toLowerCase().replace(/\s+/g, '-')}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`,
              permissions: newPermissionsMap[`${menu.id}-${sub.id}`] || {
                canView: false, canCreate: false, canEdit: false, canDelete: false,
              },
            }));

          return {
            id: menu.id,
            name: menu.name,
            icon: menu.icon || 'Folder',
            path: subs.length === 0
              ? `/${menu.name.toLowerCase().replace(/\s+/g, '-')}`
              : null,
            subMenus: subs,
            permissions: newPermissionsMap[`${menu.id}`] || {
              canView: true, canCreate: false, canEdit: false, canDelete: false,
            },
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      setSidebarMenus(builtMenus);
      setPermissionsMap(newPermissionsMap);
    } catch (err) {
      console.error('Erro ao carregar menus por role:', err);
      setError(err.message);
      setSidebarMenus([]);
      setPermissionsMap({});
    } finally {
      setLoading(false);
    }
  }, []);

  const hasPermission = useCallback((menuId, subMenuId, action) => {
    const key = subMenuId ? `${menuId}-${subMenuId}` : `${menuId}`;
    return !!permissionsMap[key]?.[action];
  }, [permissionsMap]);

  const getPermissions = useCallback((menuId, subMenuId) => {
    const key = subMenuId ? `${menuId}-${subMenuId}` : `${menuId}`;
    return permissionsMap[key] || {
      canView: false, canCreate: false, canEdit: false, canDelete: false,
    };
  }, [permissionsMap]);

  const clearMenus = useCallback(() => {
    setSidebarMenus([]);
    setPermissionsMap({});
    setError(null);
  }, []);

  return (
    <MenuContext.Provider value={{
      sidebarMenus, permissionsMap, loading, error,
      loadMenusByRole, hasPermission, getPermissions, clearMenus,
    }}>
      {children}
    </MenuContext.Provider>
  );
}