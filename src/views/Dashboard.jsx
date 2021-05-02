import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import DashboardCharts from "../components/DashboardCharts";
import StatCard from "../components/StatCard";

import { Button, ButtonToolbar, Col, Row, Panel, Grid, Icon } from "rsuite";
import BestSellerCard from "../components/BestSellerCard";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>
        <NavigasiBar />
        <Grid fluid>
          <Row className="px-2 py-2">
            <Col xsHidden smHidden xs={24} sm={24} md={4}>
              <div className="pr-4">
                <SideBar />
              </div>
            </Col>
            <Col xs={24} sm={24} md={20}>
              <div className="pb-1 flex" style={{ alignItems: "center" }}>
                <span className="t2 pr-1">Statistik</span>
                <ButtonToolbar>
                  <Button size="xs" appearance="primary">
                    Harian
                  </Button>
                  <Button size="xs">Mingguan</Button>
                  <Button size="xs">Bulanan</Button>
                </ButtonToolbar>
              </div>
              <Row gutter={16}>
                <StatCard
                  bgcolor="red"
                  textcolor="white"
                  viewdate="Hari ini"
                  count="89"
                  cardname="Item Terjual"
                  iconname="shopping-bag"
                />
                <StatCard
                  bgcolor="pink"
                  textcolor="white"
                  viewdate="Hari ini"
                  count="25"
                  cardname="Pelanggan"
                  iconname="peoples"
                />
                <StatCard
                  bgcolor="purple"
                  textcolor="white"
                  viewdate="Hari ini"
                  count="42"
                  cardname="Transaksi"
                  iconname="shopping-cart"
                />
                <StatCard
                  bgcolor="indigo"
                  textcolor="white"
                  viewdate="Hari ini"
                  count="19"
                  cardname="Stok Opname"
                  iconname="attribution"
                />
              </Row>
              <div className="pb-1 pt-2 flex" style={{ alignItems: "center" }}>
                <span className="t2 pr-1">Grafik</span>
                <ButtonToolbar>
                  <Button appearance="primary" size="xs">
                    Bar Chart
                  </Button>
                  <Button size="xs">Line Chart</Button>
                </ButtonToolbar>
              </div>
              <Row gutter={16}>
                <Col className="py-1" xs={24} sm={24} md={18}>
                  <Panel bordered>
                    <DashboardCharts />
                  </Panel>
                </Col>
                <Col className="py-1" xs={24} sm={24} md={6}>
                  <BestSellerCard
                    viewdate="Hari ini"
                    cardname="Best Seller"
                    iconname="line-chart"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
