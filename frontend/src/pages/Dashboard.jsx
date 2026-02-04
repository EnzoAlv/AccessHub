import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h2>Bem-vindo, {user?.nome}!</h2>
        <p>Sistema de Gestão de Acessos</p>

        <div className="welcome-card">
          <h3>Informações do Usuário</h3>
          <div className="user-info">
            <div className="info-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>Perfil:</label>
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="coming-soon">
          <p>🚀 Sidebar dinâmica com menus em desenvolvimento...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
