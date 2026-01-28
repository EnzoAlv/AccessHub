import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Header, Content, Footer, Button } from "rsuite";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container className="dashboard-container">
      <Header className="dashboard-header">
        <div className="header-left">
          <h1>AccessHub</h1>
        </div>
        <div className="header-right">
          <span className="user-name">Bem-vindo, {user?.nome}!</span>
          <Button onClick={handleLogout} appearance="primary">
            Sair
          </Button>
        </div>
      </Header>

      <Container>
        <Content className="dashboard-content">
          <h2>Dashboard</h2>
          <p>Bem-vindo ao Sistema de Gestão de Acessos!</p>
          <p>Seu email: {user?.email}</p>
          <p>Seu perfil: {user?.role}</p>

          <div className="coming-soon">
            <p>
              🚀 Sidebar dinâmica com menus e submenus em desenvolvimento...
            </p>
          </div>
        </Content>
      </Container>

      <Footer className="dashboard-footer">
        <p>&copy; 2026 AccessHub - Sistema de Gestão de Acessos</p>
      </Footer>
    </Container>
  );
}
