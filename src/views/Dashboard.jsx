import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import BestSellerCard from "../components/BestSellerCard";
import StatCard from "../components/StatCard";
import BarCharts from "../components/charts/BarCharts";
import LineCharts from "../components/charts/LineCharts";
import AreaCharts from "../components/charts/AreaCharts";

import { Col, Row, Panel, Grid, ButtonToolbar, Button } from "rsuite";

class Dashboard extends Component {
  state = {
    chartType: 1,
    dataType: 1,
  };
  render() {
    const chartType = this.state.chartType;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xsHidden smHidden xs={24} sm={24} md={4} className="px-0px">
              <div className="pr-1">
                <SideBar />
              </div>
            </Col>
            <Col xs={24} sm={24} md={20} className="px-0px">
              <NavigasiBar title="Dashboard" />
              <div className="p-3 animate__animated animate__fadeIn">
                <div className="pb-1 flex jc-sb ai-c">
                  <span className="t3 pr-2">Statistik</span>

                  {/* <Dropdown title="Harian" appearance="primary" size="xs">
                    <Dropdown.Item>
                      <span>Harian</span>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <span>Mingguan</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <span>Bulanan</span>
                    </Dropdown.Item>
                  </Dropdown> */}

                  <ButtonToolbar>
                    <Button appearance="primary" size="xs">
                      Harian
                    </Button>
                    <Button appearance="ghost" size="xs">
                      Mingguan
                    </Button>
                    <Button appearance="ghost" size="xs">
                      Bulanan
                    </Button>
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
                    cardname="Stok Barang"
                    iconname="attribution"
                  />
                </Row>

                <Row gutter={16}>
                  <Col className="py-2" xs={24} sm={24} md={18}>
                    <Panel className="is-bg-white">
                      <div className="pb-2 flex jc-sb ai-c">
                        <span className="t3 pr-2">Grafik</span>
                        <ButtonToolbar>
                          <Button
                            appearance="primary"
                            size="xs"
                            onClick={() => this.setState({ chartType: 1 })}
                          >
                            Bar
                          </Button>
                          <Button
                            appearance="ghost"
                            size="xs"
                            onClick={() => this.setState({ chartType: 2 })}
                          >
                            Line
                          </Button>
                          <Button
                            appearance="ghost"
                            size="xs"
                            onClick={() => this.setState({ chartType: 3 })}
                          >
                            Area
                          </Button>
                        </ButtonToolbar>
                      </div>
                      {/* <BarCharts /> */}
                      {chartType === 1 && <BarCharts />}
                      {chartType === 2 && <LineCharts />}
                      {chartType === 3 && <AreaCharts />}
                    </Panel>
                  </Col>
                  <Col className="py-2" xs={24} sm={24} md={6}>
                    <BestSellerCard
                      viewdate="Hari ini"
                      cardname="Best Seller"
                      iconname="line-chart"
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
