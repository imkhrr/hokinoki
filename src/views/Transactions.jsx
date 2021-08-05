import React from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid, IconButton, Icon } from "rsuite";
import AddTransactions from "./transactions/AddTransactions";
import SellTransactions from "./transactions/SellTransactions";
import Checkout from "./transactions/Checkout";
import { useRecoilState, useRecoilValue } from "recoil";
import { Cart, Page } from "../store/Trans";

function Transactions() {

    const shopCart = useRecoilValue(Cart);
    const [transIndex, setTransIndex] = useRecoilState(Page);

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
                        <div className="px-3 pt-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                {transIndex === 0 && <SellTransactions />}
                                {transIndex === 1 && <AddTransactions />}
                                {transIndex === 2 && <Checkout />}
                            </div>
                            {transIndex === 0 && (
                                <div className="flex jc-sb  pt-1">
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
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Transactions;
