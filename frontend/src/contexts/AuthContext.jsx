import { createContext, useState, useCallback, useEffect } from "react";
import { useMenu } from "../hooks/useMenu";
import userService from "../services/userService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("accesshub_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { loadMenusByRole, clearMenus } = useMenu();

  useEffect(() => {
    if (user?.roleId) {
      loadMenusByRole(user.roleId);
    }
  }, []);

  const login = useCallback(
    async (username, password) => {
      setLoading(true);
      setError(null);

      try {
        const users = await userService.getAllUsers();
        const foundUser = users.find(
          (u) => u.username?.toLowerCase() === username.toLowerCase(),
        );

        if (!foundUser) {
          throw new Error("Usuário não encontrado");
        }

        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          name: foundUser.name,
          email: foundUser.email,
          roleId: foundUser.roleId,
          roleName: foundUser.role?.name || "Unknown",
        };

        setUser(userData);
        localStorage.setItem("accesshub_user", JSON.stringify(userData));

        await loadMenusByRole(userData.roleId);

        return userData;
      } catch (err) {
        const message = err.message || "Erro ao fazer login";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [loadMenusByRole],
  );


  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem("accesshub_user");
    localStorage.removeItem("accesshub_token");
    clearMenus();
  }, [clearMenus]);

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
