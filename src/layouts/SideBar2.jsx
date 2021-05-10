import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Icon, Sidenav, Dropdown } from "rsuite";

import "../styles/sidebar.css";

function SideBar2() {

    return (
        <Sidenav className="is-bg-white" style={{ minHeight: "100vh" }} activeKey="3">
            <Sidenav.Header>
                <div style={{ padding: 20, fontSize: 16, background: '#34c3ff', color: ' #fff' }}>HOKI NOKI</div>
            </Sidenav.Header>
            <Sidenav.Body>
                <Nav>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" exact to="/" icon={<Icon className="is-red" icon="home" />}>
                        <span> Dashboard </span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="transaksi" icon={<Icon className="is-green" icon="shopping-cart" />}>
                        <span> Transaksi </span>
                    </Nav.Item>
                    <Dropdown eventKey="3" title="Manajemen" icon={<Icon className="pr-2" icon="list" />}>
                        <Dropdown.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/items" icon={<Icon className="is-orange" icon="shopping-bag" />}>
                            <span> Items </span>
                        </Dropdown.Item>
                        <Dropdown.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/users" icon={<Icon className="is-orange" icon="avatar" />}>
                            <span> Users </span>
                        </Dropdown.Item>
                        <Dropdown.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/customers" icon={<Icon className="is-orange" icon="people-group" />}>
                            <span> Customers </span>
                        </Dropdown.Item>
                    </Dropdown>
                    <Dropdown eventKey="4" title="Settings" icon={<Icon icon="gear-circle" />} >
                        <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                        <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                        <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                        <Dropdown.Menu eventKey="4-5" title="Custom Action">
                            <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                            <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    );
}

export default SideBar2;
