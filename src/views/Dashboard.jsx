import React, { useEffect, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import BestSellerCard from "../components/BestSellerCard";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/charts/DashboardChart";

import { Col, Row, Panel, Grid, Dropdown } from "rsuite";
import axios from "axios";

function Dashboard() {
  const [customer, setCustomer] = useState(0);
  const [statDate, setDate] = useState("Hari ini");
  const [actKey, setKey] = useState("a");

  const setDay = () => {
    setDate("Hari ini");
    setKey("a");
  };
  const setWeek = () => {
    setDate("Minggu ini");
    setKey("b");
  };
  const setMonth = () => {
    setDate("Bulan ini");
    setKey("c");
  };

  const statData = async (e) => {
    try {
      let { data } = await axios.get("dashboard/customer");
      setCustomer(data);
    } catch (error) {}
  };

  useEffect(() => {
    statData();
  }, []);

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
            <div className="p-3 animate__animated animate__fadeIn animate__fast">
              <div className="flex jc-sb">
                <span className="t3 pr-2">Statistik</span>
                <Dropdown title="Tampilan Data" activeKey={actKey} size="xs">
                  <Dropdown.Item eventKey="a" onSelect={setDay}>
                    Harian
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="b" onSelect={setWeek}>
                    Mingguan
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="c" onSelect={setMonth}>
                    Bulanan
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <Row gutter={16}>
                <StatCard
                  bgcolor="red"
                  textcolor="white"
                  viewdate={statDate}
                  count="89"
                  cardname="Barang Terjual"
                  iconname="shopping-bag"
                />

                <StatCard
                  bgcolor="pink"
                  textcolor="white"
                  viewdate={statDate}
                  count="42"
                  cardname="Transaksi"
                  iconname="shopping-cart"
                />
                <StatCard
                  bgcolor="purple"
                  textcolor="white"
                  viewdate="Total"
                  count="29"
                  cardname="Pelanggan"
                  iconname="peoples"
                />
                <StatCard
                  bgcolor="indigo"
                  textcolor="white"
                  viewdate="Total"
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
                    viewdate={statDate}
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
