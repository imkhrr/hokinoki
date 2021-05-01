import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TableCustomers from "../components/tables/TableCustomers";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const customersData = [
      {
        id: 1,
        name: "Harjendra Nugraha",
        address: "Jl. Merpati",
        contact: "085607903567",
      },
      {
        id: 1,
        name: "Galih Buana Aji",
        address: "Jl. Melati",
        contact: "085604503577",
      },
      {
        id: 1,
        name: "Yordan Wili",
        address: "Jl. Merak",
        contact: "085607912347",
      },
    ];

    return (
      <div>
        <NavigasiBar />
        <Grid fluid>
          <Row className="px-1 py-2">
            <Col xsHidden smHidden xs={24} sm={24} md={4}>
              <div className="pr-4">
                <SideBar />
              </div>
            </Col>
            <Col xs={24} sm={24} md={20}>
              <div className="pb-2">
                <span className="t2 pr-1">Data Customers</span>
              </div>
              <div>
                <TableCustomers listdata={customersData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Customers;
