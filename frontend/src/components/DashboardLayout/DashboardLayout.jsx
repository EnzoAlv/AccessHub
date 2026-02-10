import { Container, Content } from "rsuite";
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="show-container" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      <Sidebar />

      <Container style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <DashboardHeader />
        
        <Content style={{ padding: 20, overflowY: 'auto', backgroundColor: '#f5f7fa' }}>
          {children}
        </Content>
      </Container>
    </div>
  );
}