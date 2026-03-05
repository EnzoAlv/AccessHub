import { createContext, useState, useCallback } from "react";
import menuService from "../services/menuService";
import permissionService from "../services/permissionService";

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

      const newPermissionsMap = {};

      const menuPermissions = permissions.filter(
        (p) => !p.subMenuId && p.canView,
      );
      const subMenuPermissions = permissions.filter(
        (p) => p.subMenuId && p.canView,
      );

      const allowedMenuIds = new Set(menuPermissions.map((p) => p.menuId));
      const allowedSubMenuIds = new Set(
        subMenuPermissions.map((p) => p.subMenuId),
      );

      subMenuPermissions.forEach((p) => {
        allowedMenuIds.add(p.menuId);
      });

      permissions.forEach((p) => {
        const key = p.subMenuId ? `${p.menuId}-${p.subMenuId}` : `${p.menuId}`;
        newPermissionsMap[key] = {
          canView: p.canView,
          canCreate: p.canCreate,
          canEdit: p.canEdit,
          canDelete: p.canDelete,
        };
      });

      const builtMenus = allMenus
        .filter((menu) => allowedMenuIds.has(menu.id))
        .map((menu) => {
          const menuSubMenus = allSubMenus
            .filter(
              (sub) => sub.menuId === menu.id && allowedSubMenuIds.has(sub.id),
            )
            .map((sub) => ({
              id: sub.id,
              name: sub.name,
              path:
                sub.path ||
                `/${menu.name.toLowerCase().replace(/\s+/g, "-")}/${sub.name.toLowerCase().replace(/\s+/g, "-")}`,
              permissions: newPermissionsMap[`${menu.id}-${sub.id}`] || {
                canView: false,
                canCreate: false,
                canEdit: false,
                canDelete: false,
              },
            }));

          return {
            id: menu.id,
            name: menu.name,
            icon: menu.icon || "Folder",
            path:
              menuSubMenus.length === 0
                ? `/${menu.name.toLowerCase().replace(/\s+/g, "-")}`
                : null,
            subMenus: menuSubMenus,
            permissions: newPermissionsMap[`${menu.id}`] || {
              canView: true,
              canCreate: false,
              canEdit: false,
              canDelete: false,
            },
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      setSidebarMenus(builtMenus);
      setPermissionsMap(newPermissionsMap);
    } catch (err) {
      console.error("Erro ao carregar menus por role:", err);
      setError(err.message);
      setSidebarMenus([]);
      setPermissionsMap({});
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @param {number} menuId
   * @param {number|null} subMenuId
   * @param {'canView'|'canCreate'|'canEdit'|'canDelete'} action
   * @returns {boolean}
   */
  const hasPermission = useCallback(
    (menuId, subMenuId, action) => {
      const key = subMenuId ? `${menuId}-${subMenuId}` : `${menuId}`;
      const perms = permissionsMap[key];
      if (!perms) return false;
      return !!perms[action];
    },
    [permissionsMap],
  );


  const getPermissions = useCallback(
    (menuId, subMenuId) => {
      const key = subMenuId ? `${menuId}-${subMenuId}` : `${menuId}`;
      return (
        permissionsMap[key] || {
          canView: false,
          canCreate: false,
          canEdit: false,
          canDelete: false,
        }
      );
    },
    [permissionsMap],
  );

  const clearMenus = useCallback(() => {
    setSidebarMenus([]);
    setPermissionsMap({});
    setError(null);
  }, []);

  const value = {
    sidebarMenus,
    permissionsMap,
    loading,
    error,
    loadMenusByRole,
    hasPermission,
    getPermissions,
    clearMenus,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
