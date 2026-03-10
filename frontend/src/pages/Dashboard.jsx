import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`dashboard ${sidebarCollapsed ? "dashboard--collapsed" : ""}`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="dashboard__content">
        <div className="dashboard__welcome">
          <h1>Bem-vindo ao AccessHub</h1>
          <p>Selecione uma opção no menu lateral para começar.</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
