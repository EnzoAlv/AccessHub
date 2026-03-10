import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";
import { useAuth } from "../../hooks/useAuth";
import {
  Users,
  Shield,
  Settings,
  Folder,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import "./Sidebar.css";

const iconMap = {
  Users,
  Shield,
  Settings,
  Folder,
  LayoutDashboard,
};

function getIcon(iconName) {
  return iconMap[iconName] || Folder;
}

export default function Sidebar({ collapsed, onToggle }) {
  const { sidebarMenus, loading } = useMenu();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleNavigate = (path) => {
    if (path) navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__header">
        {!collapsed && <h2 className="sidebar__title">AccessHub</h2>}
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          title={collapsed ? "Expandir" : "Recolher"}
        >
          {collapsed ? <MenuIcon size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="sidebar__nav">
        <button
          className={`sidebar__item ${isActive("/dashboard") ? "sidebar__item--active" : ""}`}
          onClick={() => handleNavigate("/dashboard")}
          title="Dashboard"
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {loading ? (
          <div className="sidebar__loading">
            {!collapsed && <span>Carregando...</span>}
          </div>
        ) : (
          sidebarMenus.map((menu) => {
            const Icon = getIcon(menu.icon);
            const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;
            const isExpanded = expandedMenus[menu.id];

            return (
              <div key={menu.id} className="sidebar__menu-group">
                <button
                  className={`sidebar__item ${
                    !hasSubMenus && isActive(menu.path)
                      ? "sidebar__item--active"
                      : ""
                  }`}
                  onClick={() =>
                    hasSubMenus
                      ? toggleMenu(menu.id)
                      : handleNavigate(menu.path)
                  }
                  title={menu.name}
                >
                  <Icon size={20} />
                  {!collapsed && (
                    <>
                      <span className="sidebar__item-text">{menu.name}</span>
                      {hasSubMenus && (
                        <span className="sidebar__chevron">
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {hasSubMenus && isExpanded && !collapsed && (
                  <div className="sidebar__submenu">
                    {menu.subMenus.map((sub) => (
                      <button
                        key={sub.id}
                        className={`sidebar__subitem ${
                          isActive(sub.path) ? "sidebar__subitem--active" : ""
                        }`}
                        onClick={() => handleNavigate(sub.path)}
                        title={sub.name}
                      >
                        <span>{sub.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>

      <div className="sidebar__footer">
        {!collapsed && user && (
          <div className="sidebar__user">
            <span className="sidebar__user-name">
              {user.name || user.username}
            </span>
            <span className="sidebar__user-role">{user.roleName}</span>
          </div>
        )}
        <button
          className="sidebar__item sidebar__logout"
          onClick={handleLogout}
          title="Sair"
        >
          <LogOut size={20} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
