import React, { useEffect, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid, IconButton, Icon, InputGroup, Input, Panel, Tag, FormGroup, ControlLabel, FormControl, InputNumber } from "rsuite";
import TableStoreHouse from "../components/tables/storehouse/TableStorehouse";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Storehouse } from "../store/Trans";
import TableStockOpname from "../components/tables/storehouse/TableStockOpname";

function StoreHouse() {

    const [storehouse, setStorehouse] = useRecoilState(Storehouse);
    const storehouseReset = useResetRecoilState(Storehouse);
    const [animateIn, setAnimateIn] = useState(true);
    const [togglePage, setTogglePage] = useState(false);

    const panelRestock = () => {

        return (
            <div>
                <div className="flex jc-sb">
                    <span className="t3 mb-3">Restock </span>
                    <Tag >{storehouse.data.code}</Tag>
                </div>
                <dl style={{ marginTop: '1rem' }}>
                    <dt>Nama :</dt>
                    <dd> {storehouse.data.name} </dd>
                    <dt>Stok Awal :</dt>
                    <dd> {storehouse.data.stock} </dd>
                </dl>
                <FormGroup>
                    <ControlLabel className="bold">Jumlah Masuk :</ControlLabel>
                    <InputGroup style={{ width: 80 }}>
                        <InputNumber
                            defaultValue={1}
                            size="xs"
                            min={1}
                        />
                    </InputGroup>
                </FormGroup>
                <hr />
                <div className="flex jc-sb mt-3">
                    <IconButton
                        style={{ margin: "0px 5px" }}
                        icon={<Icon icon="close" />}
                        appearance="default"
                        size="sm"
                        onClick={() => {
                            setAnimateIn(false);
                            setTimeout(() => {
                                setAnimateIn(true);
                                storehouseReset();
                            }, 600)
                        }}
                        block
                    >
                        Cancel
                    </IconButton>
                    <IconButton
                        style={{ margin: "0px 5px" }}
                        icon={<Icon icon="save" />}
                        appearance="primary"
                        color="green"
                        size="sm"
                        block
                        onClick={() => {
                            setAnimateIn(false);
                            setTimeout(() => {
                                setAnimateIn(true);
                                storehouseReset();
                            }, 600)
                        }}
                    >
                        Simpan
                    </IconButton>
                </div>
            </div>
        )
    }

    const panelOpname = () => {

        return (
            <div>
                <div className="flex jc-sb">
                    <span className="t3 mb-3">Stock Opname </span>
                </div>
                <hr />
                <div className="flex jc-sb mt-3">
                    <IconButton
                        style={{ margin: "0px 5px" }}
                        icon={<Icon icon="close" />}
                        appearance="default"
                        size="sm"
                        onClick={() => {
                            setAnimateIn(false);
                            setTogglePage(false)
                            setTimeout(() => {
                                setAnimateIn(true);
                                storehouseReset()
                            }, 600)
                        }}
                        block
                    >
                        Cancel
                    </IconButton>
                    <IconButton
                        style={{ margin: "0px 5px" }}
                        icon={<Icon icon="save" />}
                        appearance="primary"
                        color="green"
                        size="sm"
                        block
                        onClick={() => {
                            setAnimateIn(false);
                            setTimeout(() => {
                                setAnimateIn(true);
                                storehouseReset();
                            }, 600)
                        }}
                    >
                        Confirm
                    </IconButton>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (togglePage) {
            if (storehouse.panelOpen) {
                setAnimateIn(false)
                setTimeout(() => {
                    setAnimateIn(true)
                    setStorehouse({ ...storehouse, panelOpen: true, type: 'opname', })
                }, 600);
            } else {
                setStorehouse({ ...storehouse, panelOpen: true, type: 'opname', })
            }
        } else {
            setTimeout(() => {
                storehouseReset();
            }, 600);
        }
    }, [togglePage])


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
                        <NavigasiBar title="Gudang" />
                        <Grid fluid>
                            <Row className="px-3 pt-3 animate__animated animate__fadeIn">
                                <Col xs={24} sm={24} md={17} className="px-0">
                                    <div className="flex jc-sb pb-1">
                                        <span className="t3 pl-1">Data Barang</span>
                                        <div className="flex jc-sb ai-c">
                                            <InputGroup size="xs">
                                                <Input placeholder="Cari Barang" />
                                                <InputGroup.Addon>
                                                    <Icon icon="search" />
                                                </InputGroup.Addon>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: 4 }}>
                                        {togglePage ? <TableStockOpname /> : <TableStoreHouse />}
                                    </div>

                                </Col>
                                <Col xs={24} sm={24} md={7} className="px-0px">
                                    <div className="pl-2">
                                        <div className="pb-2 flex jc-sb">
                                            <div>
                                                <span className="t3 pr-1">Actions</span>
                                            </div>
                                        </div>
                                        <Panel className="is-bg-white" style={{ marginBottom: "1.5rem" }}>
                                            <IconButton
                                                icon={<Icon icon={togglePage ? 'chevron-left' : 'wpforms'} />}
                                                appearance={togglePage ? 'default' : 'primary'}
                                                onClick={() => {
                                                    setTogglePage(!togglePage);
                                                    setAnimateIn(!togglePage);
                                                    setTimeout(() => {
                                                        setAnimateIn(true);
                                                    }, 600);
                                                }}
                                                block
                                            >
                                                {togglePage ? 'Gudang' : 'Stock Opname'}
                                            </IconButton>
                                        </Panel>
                                        {
                                            storehouse.panelOpen && (
                                                <Panel className={`is-bg-white animate__animated ${animateIn ? 'animate__slideInRight' : 'animate__slideOutRight'}`} >
                                                    {storehouse.type === 'opname' ? panelOpname() : panelRestock()}
                                                </Panel>
                                            )
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </Grid>
        </div >
    );
}

export default StoreHouse;
