import React, { Component, useState } from "react";
import { Navbar, Nav, Icon, Dropdown, Button, Sidebar } from "rsuite";
import SideBar from "./SideBar";

function NavigasiBar(props) {
  const [nav, setNav] = useState(true);
  const toggleNavbar = () => {
    setNav(!nav);
  };
  return (
    <div>
      <Navbar appearance="inverse">
        <Nav>
          <Nav.Item>
            <span className="t3">Hoki Noki</span>
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <div className="is-mobile">
            <Nav.Item
              icon={<Icon icon="bars" size="lg" />}
              onSelect={toggleNavbar}
            ></Nav.Item>
          </div>
          <div className="is-desktop">
            <Dropdown
              trigger={"hover"}
              icon={<Icon icon="user-circle-o" />}
              title="Administrator"
            >
              <Dropdown.Item
                icon={<Icon icon="setting" />}
                style={{ width: 147 }}
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Item icon={<Icon icon="sign-out" />}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Nav>
      </Navbar>
      <div className="is-mobile">
        <div className={nav ? "px-2 py-2 is-hidden" : "px-2 py-2"}>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default NavigasiBar;
