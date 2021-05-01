import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TableItems from "../components/tables/TableItems";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const itemsData = [
      {
        id: 1,
        name: "Nanas",
        category: "Buah",
        price: "5.000",
        stock: "15",
      },
      {
        id: 2,
        name: "Anggur Merah",
        category: "Minuman",
        price: "75.000",
        stock: "999",
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
                <span className="t2 pr-1">Data Barang</span>
              </div>
              <div>
                <TableItems listdata={itemsData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Items;
