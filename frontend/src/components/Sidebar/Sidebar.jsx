import { useState } from "react";
import { useMenu } from "../../hooks/useMenu";
import { Sidenav, Nav, NavItem, Dropdown, Loader } from "rsuite";
import "./Sidebar.css";

export default function Sidebar() {
  const { filteredMenus, isLoading } = useMenu();
  const [expanded, setExpanded] = useState(true);

  if (isLoading) {
    return (
      <div className="sidebar-loading">
        <Loader />
      </div>
    );
  }

  return (
    <Sidenav
      expanded={expanded}
      onToggle={setExpanded}
      className="sidebar-container"
    >
      <Sidenav.Body>
        <Nav>
          {filteredMenus.map((menu) => (
            <div key={menu.id}>
              {menu.submenus && menu.submenus.length > 0 ? (
                <Dropdown
                  eventKey={menu.id}
                  title={menu.nome}
                  placement="rightStart"
                >
                  {menu.submenus.map((submenu) => (
                    <NavItem
                      key={submenu.id}
                      eventKey={submenu.id}
                      href={submenu.rota}
                    >
                      {submenu.nome}
                    </NavItem>
                  ))}
                </Dropdown>
              ) : (
                <NavItem eventKey={menu.id} href={menu.rota}>
                  {menu.nome}
                </NavItem>
              )}
            </div>
          ))}

          {filteredMenus.length === 0 && (
            <NavItem disabled>Sem menus disponíveis</NavItem>
          )}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}
