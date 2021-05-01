import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Icon } from "rsuite";

import "../styles/sidebar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
            Administrator
          </Nav.Item>
          <br />
        </div>
        <span className="pl-1 t4">MAIN MENU</span>
        <Nav.Item
          eventKey="dashboard"
          icon={<Icon className="is-red" icon="home" />}
          active
        >
          Dashboard
        </Nav.Item>
        <Nav.Item
          eventKey="transaksi"
          icon={<Icon className="is-green" icon="shopping-cart" />}
        >
          Transaksi
        </Nav.Item>
        <br />
        <span className="pl-1 t4">MANAJEMEN</span>
        <Nav.Item
          eventKey="items"
          icon={<Icon className="is-orange" icon="shopping-bag" />}
        >
          Items
        </Nav.Item>
        <Nav.Item
          eventKey="users"
          icon={<Icon className="is-blue" icon="avatar" />}
        >
          Users
        </Nav.Item>
        <Nav.Item
          eventKey="customers"
          icon={<Icon className="is-teal" icon="people-group" />}
        >
          Customers
        </Nav.Item>
        <Nav.Item
          eventKey="suppliers"
          icon={<Icon className="is-indigo" icon="truck" />}
        >
          Suppliers
        </Nav.Item>
        <br />
        <span className="pl-1 t4">LAPORAN</span>
        <Nav.Item
          eventKey="penjualan"
          icon={<Icon className="is-deep-orange" icon="money" />}
        >
          Penjualan
        </Nav.Item>
        <Nav.Item
          eventKey="stok"
          icon={<Icon className="is-brown" icon="attribution" />}
        >
          Stok Opname
        </Nav.Item>
        <Nav.Item
          eventKey="statistik"
          icon={<Icon className="is-gray" icon="pie-chart" />}
        >
          Statistik
        </Nav.Item>
        <div className="is-mobile">
          <br />
          <span className="pl-1 t4">EXTRA</span>
          <Nav.Item
            eventKey="settings"
            icon={<Icon className="is-gray" icon="setting" />}
            style={{ marginTop: "6px" }}
          >
            Settings
          </Nav.Item>
          <Nav.Item
            eventKey="logout"
            icon={<Icon className="is-gray" icon="sign-out" />}
            style={{ marginTop: "6px" }}
          >
            Logout
          </Nav.Item>
        </div>
      </Nav>
    );
  }
}

export default SideBar;
