import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import BestSellerCard from "../components/BestSellerCard";
import StatCard from "../components/StatCard";
import BarCharts from "../components/charts/BarCharts";
// import LineCharts from "../components/charts/LineCharts";
// import AreaCharts from "../components/charts/AreaCharts";

import { Col, Row, Panel, Grid, Radio, RadioGroup } from "rsuite";

class Dashboard extends Component {
    state = {
        chartType: 1,
        dataType: 1,
    };
    render() {
        // const chartType = this.state.chartType;

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
                            <div className="pb-1 flex ai-c">
                                <span className="t2 pr-1">Statistik</span>
                                <RadioGroup name="radioList" inline>
                                    <Radio value="harian">Harian</Radio>
                                    <Radio value="mingguan">Mingguan</Radio>
                                    <Radio value="bulanan">Bulanan</Radio>
                                </RadioGroup>
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
                            <div className="pb-1 pt-2 flex ai-c">
                                <span className="t2 pr-1">Grafik</span>
                                {/* <RadioGroup name="radioList" inline>
                                    <Radio name="bar" value="1" onChange={() => this.setState({ chartType: 1 })} > Bar </Radio>
                                    <Radio name="line" value="2" onChange={() => this.setState({ chartType: 2 })} > Line </Radio>
                                    <Radio name="area" value="3" onChange={() => this.setState({ chartType: 3 })} > Area </Radio> </RadioGroup> */} </div>
                            <Row gutter={16}>
                                <Col className="py-1" xs={24} sm={24} md={18}>
                                    <Panel bordered>
                                        <BarCharts />
                                        {/* {chartType === 1 && <BarCharts />}
                                        {chartType === 2 && <LineCharts />}
                                        {chartType === 3 && <AreaCharts />} */}
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
