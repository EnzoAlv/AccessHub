import { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { useMenu } from '../hooks/useMenu';
import userService from '../services/userService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('accesshub_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('accesshub_user');
      return null;
    }
  });

  const [initializing, setInitializing] = useState(() => {
    return !!localStorage.getItem('accesshub_user');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasLoadedMenus = useRef(false);

  const { loadMenusByRole, clearMenus } = useMenu();

  useEffect(() => {
    const initializeMenus = async () => {
      if (user?.roleId && !hasLoadedMenus.current) {
        hasLoadedMenus.current = true;
        try {
          await loadMenusByRole(user.roleId);
        } catch (err) {
          console.error('Erro ao carregar menus na inicialização:', err);
        }
      }
      setInitializing(false);
    };
    initializeMenus();
  }, [user, loadMenusByRole]);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Quando JWT estiver pronto, trocar por:
      // const { token, user } = await userService.login(username, password);
      // localStorage.setItem('accesshub_token', token);

      const users = await userService.getAllUsers();
      const foundUser = users.find(
        u => u.username?.toLowerCase() === username.toLowerCase()
      );

      if (!foundUser) {
        throw new Error('Usuário não encontrado');
      }

      // TODO: validar senha quando JWT estiver pronto

      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
        roleId: foundUser.roleId,
        roleName: foundUser.role?.name || 'Unknown',
      };

      localStorage.setItem('accesshub_user', JSON.stringify(userData));
      setUser(userData);

      hasLoadedMenus.current = true;
      await loadMenusByRole(userData.roleId);

      return userData;
    } catch (err) {
      const message = err.message || 'Erro ao fazer login';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [loadMenusByRole]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    hasLoadedMenus.current = false;
    localStorage.removeItem('accesshub_user');
    localStorage.removeItem('accesshub_token');
    clearMenus();
  }, [clearMenus]);

  const value = {
    user,
    loading,
    initializing,
    error,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}