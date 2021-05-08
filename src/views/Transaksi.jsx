import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid, IconButton, Icon } from "rsuite";
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
                <NavigasiBar />
                <Grid fluid>
                    <Row className="px-2 py-2">
                        <Col xsHidden smHidden xs={24} sm={24} md={4}>
                            <div className="pr-4">
                                <SideBar />
                            </div>
                        </Col>
                        <Col className="px-0px" xs={24} sm={24} md={20}>
                            <div style={{ minHeight: "77vh" }}>
                                {transIndex === 0 && <TransaksiTerakhir />}
                                {transIndex === 1 && <TambahTransaksi />}
                                {transIndex === 2 && <Checkout />}
                            </div>

                            {transIndex === 0 && (
                                <div className="flex jc-sb px-5px pt-2">
                                    <div></div>
                                    <IconButton icon={<Icon icon="plus" />} appearance="primary" style={{ width: 266 }} onClick={() => this.setState({ transIndex: 1 })} > Tambah Transaksi </IconButton>
                                </div>
                            )}
                            {transIndex === 1 && (
                                <div className="flex jc-sb px-5px pt-2">
                                    <IconButton icon={<Icon icon="chevron-left" />} appearance="default" onClick={() => this.setState({ transIndex: 0 })} > Back </IconButton>
                                    <IconButton icon={<Icon icon="shopping-cart" />} appearance="primary" style={{ width: 266 }} onClick={() => this.setState({ transIndex: 2 })} > Checkout </IconButton>
                                </div>
                            )}
                            {transIndex === 2 && (
                                <div className="flex jc-sb px-5px pt-2">
                                    <IconButton icon={<Icon icon="ban" />} appearance="default" onClick={() => this.setState({ transIndex: 1 })} > Cancel </IconButton>
                                    <IconButton icon={<Icon icon="save" />} appearance="primary" color="green" style={{ width: 266 }} onClick={() => this.setState({ transIndex: 0 })} > Simpan </IconButton>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Transaksi;
