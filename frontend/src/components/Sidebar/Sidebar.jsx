import { useState } from "react";
import { Sidenav, Nav, Sidebar as RSidebar, Navbar } from "rsuite";
import { useMenu } from "../../hooks/useMenu";
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearIcon from '@rsuite/icons/Gear';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import MenuIcon from '@rsuite/icons/Menu';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontWeight: 'bold'
};

const getIcon = (menuName) => {
  const name = menuName?.toLowerCase() || "";
  if (name.includes("dashboard")) return <DashboardIcon />;
  if (name.includes("usuário") || name.includes("user")) return <GroupIcon />;
  if (name.includes("config") || name.includes("sistema")) return <GearIcon />;
  return <MenuIcon />;
};

export default function Sidebar() {
  const { filteredMenus } = useMenu();
  const [expand, setExpand] = useState(true);

  return (
    <RSidebar
      style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#1a1d24', color: '#fff' }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        <div style={headerStyles}>
          {expand ? <span>ACCESSHUB</span> : <span style={{ marginLeft: 8 }}>AH</span>}
        </div>
      </Sidenav.Header>

      <Sidenav
        expanded={expand}
        defaultOpenKeys={[]}
        appearance="subtle"
        style={{ flex: 1, overflowY: 'auto' }} 
      >
        <Sidenav.Body>
          <Nav>
            {filteredMenus.map((menu) => {
              if (menu.submenus && menu.submenus.length > 0) {
                return (
                  <Nav.Menu
                    key={menu.id}
                    eventKey={menu.id}
                    title={menu.nome}
                    icon={getIcon(menu.nome)}
                    placement="rightStart"
                  >
                    {menu.submenus.map((submenu) => (
                      <Nav.Item key={submenu.id} eventKey={submenu.id} href={submenu.rota}>
                        {submenu.nome}
                      </Nav.Item>
                    ))}
                  </Nav.Menu>
                );
              }
              return (
                <Nav.Item key={menu.id} eventKey={menu.id} href={menu.rota} icon={getIcon(menu.nome)}>
                  {menu.nome}
                </Nav.Item>
              );
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <Navbar appearance="subtle" className="nav-toggle" style={{ borderTop: '1px solid #2c303b' }}>
        <Nav pullRight>
          <Nav.Item onClick={() => setExpand(!expand)} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <ArrowLeftLineIcon style={{color: '#fff'}} /> : <ArrowRightLineIcon style={{color: '#fff'}} />}
          </Nav.Item>
        </Nav>
      </Navbar>
    </RSidebar>
  );
}