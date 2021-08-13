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
} from "rsuite";
import { Cart, Page } from "../../store/Trans";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import TableAddTransactions from "../../components/tables/transactions/TableAddTransactions";

function AddTransactions() {

    const [shopCart, setShopCart] = useRecoilState(Cart);
    const setTransIndex = useSetRecoilState(Page);
    const clearCart = useResetRecoilState(Cart);

    const [itemSearch, setItemSearch] = useState('');
    const [inputVal, setInputVal] = useState('')

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    useEffect(() => {
        const timeout = setTimeout(() => setItemSearch(inputVal), 500);
        return () => clearTimeout(timeout);
    }, [inputVal])

    return (
        <Grid fluid>
            <Row className="animate__animated animate__fadeIn">
                <Col xs={24} sm={24} md={17} className="px-0">
                    <div className="flex jc-sb pb-1">
                        <IconButton
                            icon={<Icon icon="chevron-left" />}
                            appearance="default"
                            size="sm"
                            onClick={() => setTransIndex(0)}
                        >
                            <span className="t3 pl-1">Penjualan</span>
                        </IconButton>
                        <div className="flex jc-sb ai-c">
                            <InputGroup size="xs">
                                <Input placeholder="Cari Barang" onChange={val => setInputVal(val)} />
                                <InputGroup.Addon>
                                    <Icon icon="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                    <div style={{ paddingTop: 4 }}>
                        <TableAddTransactions search={itemSearch} />
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
                                color="red"
                                appearance="primary"
                                icon={<Icon icon="refresh" />}
                                onClick={clearCart}
                            >
                                Clear All
                            </IconButton>
                        </div>
                        <Panel
                            className="is-bg-white"
                            style={{ minHeight: "80vh" }}
                        >
                            <div
                                style={{
                                    height: "60vh",
                                    overflowY: "scroll",
                                    marginBottom: "2rem"
                                }}
                            >
                                <List style={{ boxShadow: "none" }} >
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
                                                            max={shopCart[index].limit}
                                                            min={1}
                                                        />
                                                    </InputGroup>
                                                    <IconButton
                                                        appearance="ghost"
                                                        color="red"
                                                        size="xs"
                                                        icon={<Icon icon="trash" />}
                                                        onClick={() => {
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
                            </div>
                            <div>
                                <hr />
                                <IconButton
                                    disabled={!shopCart.length}
                                    icon={<Icon icon="shopping-cart" />}
                                    appearance="primary"
                                    block
                                    onClick={() => setTransIndex(2)}
                                >
                                    Checkout
                                </IconButton>
                            </div>

                        </Panel>
                    </div>
                </Col>
            </Row>
        </Grid>
    );
}

export default AddTransactions;
