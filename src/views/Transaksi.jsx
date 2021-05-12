import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TransaksiTerakhir from "./transactions/TransaksiTerakhir";
import TambahTransaksi from "./transactions/TambahTransaksi";
import Checkout from "./transactions/Checkout";

class Transaksi extends Component {
  state = {
    transIndex: 0,
  };
  render() {
    const transIndex = this.state.transIndex;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xsHidden smHidden xs={24} sm={24} md={4} className="px-0px">
              <div className="pr-1">
                <SideBar />
              </div>
            </Col>
            <Col className="px-0px" xs={24} sm={24} md={20}>
              <NavigasiBar title="Transaksi" />
              <div className="p-3 animate__animated animate__fadeIn animate__fast">
                <div>
                  {transIndex === 0 && (
                    <TransaksiTerakhir
                      onNext={() => this.setState({ transIndex: 1 })}
                    />
                  )}
                  {transIndex === 1 && (
                    <TambahTransaksi
                      onNext={() => this.setState({ transIndex: 2 })}
                      onBack={() => this.setState({ transIndex: 0 })}
                    />
                  )}
                  {transIndex === 2 && (
                    <Checkout
                      onNext={() => this.setState({ transIndex: 0 })}
                      onBack={() => this.setState({ transIndex: 1 })}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Transaksi;
