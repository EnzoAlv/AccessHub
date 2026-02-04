import { createContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getMenusByRole } from "../services/menuService";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const { user } = useAuth();
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserMenus = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const roleId = user.roleId || user.role;
      const response = await getMenusByRole(roleId);

      setMenus(response.menus || []);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erro ao carregar menus.";
      setError(errorMessage);
      setMenus([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserMenus();
  }, [fetchUserMenus]);

  const buildMenuTree = useCallback((menuList) => {
    if (!Array.isArray(menuList)) return [];

    return menuList.map((menu) => ({
      ...menu,
      submenus: (menu.submenus || []).filter((sub) => sub.ativo !== false),
    }));
  }, []);

  const getFilteredMenus = useCallback(() => {
    return buildMenuTree(menus);
  }, [menus, buildMenuTree]);

  const value = {
    menus,
    filteredMenus: getFilteredMenus(),
    isLoading,
    error,
    refreshMenus: fetchUserMenus,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
