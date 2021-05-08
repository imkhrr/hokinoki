import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Icon } from "rsuite";

import "../styles/sidebar.css";

class SideBar extends Component {
    render() {
        return (
            <Nav vertical className="pb-2">
                <div className="is-mobile">
                    <span className="pl-1 t4">ACCOUNT</span>
                    <Nav.Item
                        eventKey="user"
                        icon={<Icon className="is-blue" icon="user-circle-o" />}
                        style={{ marginTop: "6px" }}
                    >
                        <span className="pl-1">Administrator</span>
                    </Nav.Item>
                    <br />
                </div>

                <span className="pl-1 t4">MAIN MENU</span>
                <NavLink exact to="/">
                    <Nav.Item
                        componentClass='div'
                        eventKey="dashboard"
                        icon={<Icon className="is-red" icon="home" />}
                    >
                        <span className="pl-1">Dashboard</span>
                    </Nav.Item>
                </NavLink>

                <NavLink exact to="/transaksi">
                    <Nav.Item
                        componentClass='div'
                        eventKey="transaksi"
                        icon={<Icon className="is-green" icon="shopping-cart" />}
                    >
                        <span className="pl-1">Transaksi</span>
                    </Nav.Item>
                </NavLink>
                <br />

                <span className="pl-1 t4">MANAJEMEN</span>
                <NavLink exact to="/items">
                    <Nav.Item
                        componentClass='div'
                        eventKey="items"
                        icon={<Icon className="is-orange" icon="shopping-bag" />}
                    >
                        <span className="pl-1">Items</span>
                    </Nav.Item>
                </NavLink>
                <NavLink exact to="/users">
                    <Nav.Item
                        componentClass='div'
                        eventKey="users"
                        icon={<Icon className="is-blue" icon="avatar" />}
                    >
                        <span className="pl-1">Users</span>
                    </Nav.Item>
                </NavLink>
                <NavLink exact to="/customers">
                    <Nav.Item
                        componentClass='div'
                        eventKey="customers"
                        icon={<Icon className="is-teal" icon="people-group" />}
                    >
                        <span className="pl-1">Customers</span>
                    </Nav.Item>
                </NavLink>
                <br />
                <span className="pl-1 t4">LAPORAN</span>
                <NavLink exact to="/penjualan">
                    <Nav.Item
                        componentClass='div'
                        eventKey="penjualan"
                        icon={<Icon className="is-deep-orange" icon="money" />}
                    >
                        <span className="pl-1">Penjualan</span>
                    </Nav.Item>
                </NavLink>
                <NavLink exact to="/stok">
                    <Nav.Item
                        componentClass='div'
                        eventKey="stok"
                        icon={<Icon className="is-brown" icon="attribution" />}
                    >
                        <span className="pl-1">Stok Opname</span>
                    </Nav.Item>
                </NavLink>
                <NavLink exact to="/statistik">
                    <Nav.Item
                        componentClass='div'
                        eventKey="statistik"
                        icon={<Icon className="is-gray" icon="pie-chart" />}
                    >
                        <span className="pl-1">Statistik</span>
                    </Nav.Item>
                </NavLink>
                <div className="is-mobile">
                    <br />
                    <span className="pl-1 t4">EXTRA</span>
                    <Nav.Item
                        componentClass='div'
                        eventKey="settings"
                        icon={<Icon className="is-gray" icon="setting" />}
                        style={{ marginTop: "6px" }}
                    >
                        <span className="pl-1">Settings</span>
                    </Nav.Item>
                    <Nav.Item
                        componentClass='div'
                        eventKey="logout"
                        icon={<Icon className="is-gray" icon="sign-out" />}
                        style={{ marginTop: "6px" }}
                    >
                        <span className="pl-1">Logout</span>
                    </Nav.Item>
                </div>
            </Nav>
        );
    }
}

export default SideBar;
