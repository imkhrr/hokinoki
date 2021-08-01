import React, { useEffect, useState } from "react";

import {
    Grid,
    Row,
    Col,
    Panel,
    Tag,
    Icon,
    IconButton,
    List,
    InputGroup,
    Input,
    InputNumber,
    Button,
} from "rsuite";
import { Cart } from "../../store/Trans";
import TableTambahTransaksi from "../../components/tables/transactions/TableTambahTransaksi";
import { useRecoilState, useResetRecoilState } from "recoil";

function TambahTransaksi() {

    const [shopCart, setShopCart] = useRecoilState(Cart);
    const clearCart = useResetRecoilState(Cart);

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });


    return (
        <Grid fluid>
            <Row className="animate__animated animate__fadeIn">
                <Col xs={24} sm={24} md={17} className="px-0px">
                    <div className="pb-2 flex jc-sb">
                        <span className="t3 pr-1">Penjualan</span>
                        <div className="flex jc-sb ai-c">
                            <InputGroup size="xs">
                                <Input placeholder="Cari Barang" />
                                <InputGroup.Addon>
                                    <Icon icon="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="pb-4" style={{ paddingTop: 4 }}>
                        <TableTambahTransaksi />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} className="px-0px">
                    <div className="pl-2">
                        <div className="pb-2 flex jc-sb">
                            <div>
                                <span className="t3 pr-1">Keranjang</span>

                                <Tag color="blue">{shopCart.length}</Tag>
                            </div>

                            <IconButton
                                size="xs"
                                appearance="ghost"
                                icon={<Icon icon="check" />}
                                onClick={clearCart}
                            >
                                Clear All
                            </IconButton>
                        </div>
                        <Panel
                            className="customscroll is-bg-white"
                            style={{ height: "69vh", overflowY: "scroll" }}
                        >
                            <List style={{ boxShadow: "none" }}>
                                {
                                    shopCart.map((item, index) => (
                                        <List.Item key={item["id"]} index={index} >
                                            <div className="flex jc-sb">
                                                <span className="bold">{item["name"]}</span>
                                                <span>{curr.format(item["count"] * item["price"]).slice(0, -3)}</span>
                                                {/* <span>Rp. {item["price"]}</span> */}
                                            </div>
                                            <br />
                                            <div className="flex jc-sb">
                                                <InputGroup style={{ width: 80 }}>
                                                    <InputNumber
                                                        defaultValue={1}
                                                        value={item["count"]}
                                                        onChange={(val) => {
                                                            let _shopCart = [...shopCart];
                                                            _shopCart[index] = {
                                                                ..._shopCart[index],
                                                                count: parseInt(val)
                                                            };
                                                            setShopCart(_shopCart);
                                                        }}
                                                        size="xs"
                                                        max={99}
                                                        min={1}
                                                    />
                                                </InputGroup>
                                                <IconButton
                                                    appearance="ghost"
                                                    color="red"
                                                    size="xs"
                                                    icon={<Icon icon="trash" />}
                                                    onClick={ () => {
                                                        let _shopCart = [...shopCart];
                                                        _shopCart.splice(index, 1)
                                                        setShopCart(_shopCart);
                                                    }}
                                                >
                                                    Hapus
                                                </IconButton>
                                            </div>
                                        </List.Item>
                                    ))
                                }
                            </List>
                        </Panel>
                    </div>
                </Col>
            </Row>
        </Grid>
    );
    // }
}

export default TambahTransaksi;
