import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TableSuppliers from "../components/tables/TableSuppliers";

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const suppliersData = [
      {
        id: 1,
        name: "Wildan Affandi",
        items: "Tomat, Selada, Bawang",
        address: "Jl. Bintang",
      },
      {
        id: 1,
        name: "Putra Buah",
        items: "Apel, Jeruk, Semangka",
        address: "Jl. Jupiter",
      },
      {
        id: 1,
        name: "PT. Indofood",
        items: "Bumbu jadi",
        address: "Jl. Surya Kencana",
      },
      {
        id: 1,
        name: "PT. Kapal Api",
        items: "Kopi Sachet",
        address: "Jl. Apel",
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
                <span className="t2 pr-1">Data Suppliers</span>
              </div>
              <div>
                <TableSuppliers listdata={suppliersData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Suppliers;
