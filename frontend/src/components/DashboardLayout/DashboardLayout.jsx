import { Container } from "rsuite";
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content-wrapper">
          <Container>{children}</Container>
        </div>
      </div>
    </div>
  );
}
