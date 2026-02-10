import { Navbar, Nav, Dropdown, Avatar } from "rsuite";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ExitIcon from '@rsuite/icons/Exit';
import UserInfoIcon from '@rsuite/icons/UserInfo';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (n) => n?.split(" ").slice(0, 2).map(c => c[0]).join("").toUpperCase() || "U";

  return (
    <Navbar appearance="default" style={{ borderBottom: '1px solid #e5e5e5' }}>
      <Navbar.Brand>
        <span style={{ fontWeight: 600, color: '#575757' }}>Visão Geral</span>
      </Navbar.Brand>

      <Nav pullRight>
        <Nav.Menu
            icon={
                <Avatar circle size="xs" style={{ background: '#3498ff', verticalAlign: 'middle' }}>
                    {getInitials(user?.nome)}
                </Avatar>
            }
            title={user?.nome?.split(' ')[0]}
            placement="bottomEnd"
        >
            <Dropdown.Item panel style={{ padding: 10, width: 200 }}>
                <p>Logado como</p>
                <strong>{user?.nome}</strong>
                <br />
                <small className="text-muted">{user?.email}</small>
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item icon={<UserInfoIcon />}>Perfil</Dropdown.Item>
            <Dropdown.Item icon={<ExitIcon />} onClick={() => { logout(); navigate('/login'); }}>
                Sair
            </Dropdown.Item>
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
}