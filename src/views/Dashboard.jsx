import React, { useEffect, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import BestSellerCard from "../components/BestSellerCard";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/charts/DashboardChart";

import { Col, Row, Panel, Grid, } from "rsuite";
import axios from "axios";

function Dashboard() {

    const [customer, setCustomer] = useState(0);
    const [sale, setSale] = useState(0);
    const [itemSold, setItemSold] = useState(0);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        axios.get('dashboard/customer')
            .then((response) => {
                setCustomer(response.data)
            })
            .catch((e) => {
                console.log(e);
            });

        axios.get('dashboard/sale')
            .then((response) => {
                setSale(response.data)
            })
            .catch((e) => {
                console.log(e);
            });

        axios.get('dashboard/item-sold')
            .then((response) => {
                setItemSold(response.data)
            })
            .catch((e) => {
                console.log(e);
            });

        axios.get('dashboard/best-seller')
            .then((response) => {
                setBestSeller(response.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    
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
                                    count={itemSold}
                                    cardname="Terjual"
                                    iconname="shopping-bag"
                                />
                                <StatCard
                                    bgcolor="pink"
                                    textcolor="white"
                                    viewdate="Hari ini"
                                    count={sale}
                                    cardname="Transaksi"
                                    iconname="shopping-cart"
                                />
                                <StatCard
                                    bgcolor="purple"
                                    textcolor="white"
                                    viewdate="Total"
                                    count={customer}
                                    cardname="Member"
                                    iconname="peoples"
                                />
                                {/* <StatCard
                                    bgcolor="indigo"
                                    textcolor="white"
                                    viewdate="Hari ini"
                                    count="19"
                                    cardname="Stok Barang"
                                    iconname="attribution"
                                /> */}
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
                                        listData={bestSeller}
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
