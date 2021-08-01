import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Icon } from "rsuite";
import Restricted from "../middleware/forbiden/Restricted";

import "../styles/sidebar.css";

function SideBar() {

    return (
        <div className="is-bg-white px-2 py-3" style={{ minHeight: "100vh" }}>
            <span className="pl-1 t4">HOME</span>
            <Nav vertical>
                <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" exact to="/" icon={<Icon className="is-red" icon="home" />}>
                    <span className="pl-1"> Dashboard </span>
                </Nav.Item>
                <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="transaksi" icon={<Icon className="is-green" icon="shopping-cart" />}>
                    <span className="pl-1">Transaksi</span>
                </Nav.Item>
            </Nav>
            <Restricted forRole="cashier">
                <br />
                <span className="pl-1 t4">MANAJEMEN</span>
                <Nav vertical>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/items" icon={<Icon className="is-orange" icon="shopping-bag" />}>
                        <span className="pl-1">Barang</span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/users" icon={<Icon className="is-blue" icon="avatar" />}>
                        <span className="pl-1">Pengguna</span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/customers" icon={<Icon className="is-teal" icon="people-group" />}>
                        <span className="pl-1">Pelanggan</span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/stock" icon={<Icon className="is-brown" icon="cube" />}>
                        <span className="pl-1">Gudang</span>
                    </Nav.Item>
                </Nav>
                <br />
                <span className="pl-1 t4">LAPORAN</span>
                <Nav vertical>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/selling" icon={<Icon className="is-deep-orange" icon="money" />}>
                        <span className="pl-1">Penjualan</span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/statistics" icon={<Icon className="is-gray" icon="pie-chart" />}>
                        <span className="pl-1">Statistik</span>
                    </Nav.Item>
                </Nav>
            </Restricted>
            <div className="is-mobile">
                <br />
                <span className="pl-1 t4">EXTRA</span>
                <Nav vertical>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/settings" icon={<Icon className="is-gray" icon="setting" />} style={{ marginTop: "6px" }} >
                        <span className="pl-1">Settings</span>
                    </Nav.Item>
                    <Nav.Item componentClass={NavLink} activeClassName="rs-nav-item-active" to="/logout" icon={<Icon className="is-gray" icon="sign-out" />} style={{ marginTop: "6px" }} >
                        <span className="pl-1">Logout</span>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
}

export default SideBar;
