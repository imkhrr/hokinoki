import React, { useEffect, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import BestSellerCard from "../components/BestSellerCard";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/charts/DashboardChart";
// import SideBar2 from "../layouts/SideBar2";

import { Col, Row, Panel, Grid, } from "rsuite";
import axios from "axios";

function Dashboard() {

    const [customer, setCustomer] = useState(0);

    const statData = async (e) => {
        try {
            let { data } = await axios.get('dashboard/customer');
            setCustomer(data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        statData()
    },[])

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
                                    count={ customer }
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
                                        </div>
                                        <DashboardChart />
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

export default Dashboard;
