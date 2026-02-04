import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header, Avatar, Dropdown } from "rsuite";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (nome) => {
    return (
      nome
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <Header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-title">AccessHub</h1>
      </div>
      <div className="header-right">
        <span className="header-user-role">{user?.role}</span>
        <Dropdown
          title={
            <Avatar circle size="sm" className="header-avatar">
              {getInitials(user?.nome)}
            </Avatar>
          }
          noCaret
          placement="bottomEnd"
        >
          <Dropdown.Item disabled>
            <div className="dropdown-user-info">
              <strong>{user?.nome}</strong>
              <small>{user?.email}</small>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>🚪 Sair</Dropdown.Item>
        </Dropdown>
      </div>
    </Header>
  );
}
