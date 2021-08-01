import React, { useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid, IconButton, Icon } from "rsuite";
import TransaksiTerakhir from "./transactions/TransaksiTerakhir";
import TambahTransaksi from "./transactions/TambahTransaksi";
import Checkout from "./transactions/Checkout";
import { useRecoilValue } from "recoil";
import { Cart } from "../store/Trans";

function Transaksi() {

    const shopCart = useRecoilValue(Cart)
    const [transIndex, setTransIndex] = useState(0)
    console.log(shopCart);

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
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                {transIndex === 0 && <TransaksiTerakhir />}
                                {transIndex === 1 && <TambahTransaksi />}
                                {transIndex === 2 && <Checkout />}
                            </div>

                            {transIndex === 0 && (
                                <div className="flex jc-sb  pt-2">
                                    <div></div>
                                    <IconButton
                                        icon={<Icon icon="plus" />}
                                        appearance="primary"
                                        onClick={() => setTransIndex(1)}
                                    >
                                        Tambah Transaksi
                                    </IconButton>
                                </div>
                            )}
                            {transIndex === 1 && (
                                <div className="flex jc-sb pt-1">
                                    <IconButton
                                        icon={<Icon icon="chevron-left" />}
                                        appearance="default"
                                        onClick={() => setTransIndex(0)}
                                    >
                                        Back
                                    </IconButton>
                                    <IconButton
                                        disabled={!shopCart.length}
                                        icon={<Icon icon="shopping-cart" />}
                                        appearance="primary"
                                        style={{ width: 310 }}
                                        onClick={() => setTransIndex(2)}
                                    >
                                        Checkout
                                    </IconButton>
                                </div>
                            )}
                            {transIndex === 2 && (
                                <div className="flex jc-sb pt-2">
                                    <IconButton
                                        icon={<Icon icon="chevron-left" />}
                                        appearance="default"
                                        onClick={() => setTransIndex(1)}
                                    >
                                        Back
                                    </IconButton>
                                    <IconButton
                                        icon={<Icon icon="save" />}
                                        appearance="primary"
                                        color="green"
                                        style={{ width: 310 }}
                                        onClick={() => setTransIndex(0)}
                                    >
                                        Simpan
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Transaksi;
