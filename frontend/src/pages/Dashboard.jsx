import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="welcome-section">
        <h2 className="welcome-title">Olá, {user?.nome?.split(' ')[0]}! 👋</h2>
        <p className="welcome-text">Aqui está o resumo dos seus acessos hoje.</p>
      </div>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 10 }}>Seu Perfil</h3>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{user?.role}</div>
          <div style={{ fontSize: 12, color: '#10b981', marginTop: 5 }}>● Ativo agora</div>
        </div>
        <div className="stat-card">
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 10 }}>Email Cadastrado</h3>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#374151', wordBreak: 'break-all' }}>{user?.email}</div>
        </div>
        <div className="stat-card" style={{ borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#d1d5db' }}>Novos Widgets em breve</span>
        </div>
      </div>
    </DashboardLayout>
  );
}