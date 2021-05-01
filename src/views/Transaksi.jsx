import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TableTransaksiTerakhir from "../components/tables/TableTransaksTerakhir";

class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const transData = [
      {
        id: 1,
        list: "KD0978",
        buyer: "Angga",
        date: "08:46 24/04/2021",
        money: "+ 5.000",
      },
      {
        id: 2,
        list: "KO1278",
        buyer: "Pak Dimas",
        date: "12:25 23/04/2021",
        money: "+ 25.000",
      },
      {
        id: 3,
        list: "KT0978",
        buyer: "Diana",
        date: "09:12 22/04/2021",
        money: "+ 15.000",
      },
      {
        id: 4,
        list: "KT6574",
        buyer: "Putri",
        date: "15:32 21/04/2021",
        money: "+ 12.000",
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
                <span className="t2 pr-1">Transaksi Terakhir</span>
              </div>
              <div>
                <TableTransaksiTerakhir listdata={transData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Transaksi;
