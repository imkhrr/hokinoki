import React, { useCallback, useEffect, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid, IconButton, Icon, InputGroup, Input, Panel, Tag, FormGroup, ControlLabel, InputNumber, Notification } from "rsuite";
import TableStoreHouse from "../components/tables/TableStorehouse";
// import TableStockOpname from "../components/tables/storehouse/TableStockOpname";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Storehouse } from "../store/Trans";
import { authenticated } from "../store/User";
import axios from "axios";

function StoreHouse() {

    const [storehouse, setStorehouse] = useRecoilState(Storehouse);
    const auth = useRecoilValue(authenticated);
    const storehouseReset = useResetRecoilState(Storehouse);
    const [animateIn, setAnimateIn] = useState(true);
    const [panel, setPanel] = useState(false);
    const [togglePage, setTogglePage] = useState(false);
    const [data, setData] = useState(1);
    const [info, setInfo] = useState([]);
    const [reloadTable, setReloadTable] = useState(true);

    const date = new Date();

    const updateStock = async () => {
        const request = {
            stock: data,
            data: { ...storehouse.data, user: auth.user.id }
        };
        try {
            let { data } = await axios.patch(`transactions/restock/${storehouse.data.id}`, request)
            Notification.success({
                title: "Success",
                description: data.message
            })
            setAnimateIn(false);
            setStorehouse({ ...storehouse, updated: true });
            setTimeout(() => {
                setAnimateIn(true);
                setPanel(false);
                storehouseReset();
            }, 600)

        } catch (error) {
            Notification.error({
                title: "Error",
                description: "Oops, Something Wrong!"
            })
        }
    }

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
                            onChange={(e) => {
                                setData(parseInt(e));
                            }}
                            scrollable
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
                                setPanel(false);
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
                        onClick={updateStock}
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
                <dl style={{ marginTop: '1rem' }}>
                    <dt>Nama :</dt>
                    <dd> {auth.user.name} </dd>
                    <dt>Tanggal : </dt>
                    <dd> {date.toISOString().slice(0, 10)} </dd>
                </dl>
                <dl className="inline-flex">
                    <dt>Jumlah Barang </dt>
                    <dd> : {info.tableData.total || 0} </dd>
                    <dt>Barang Terupdate </dt>
                    <dd> : {info.opnameData.length || 0} </dd>
                </dl>
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
                                setPanel(false);
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
                        onClick={() => opnameConfirmation()}
                    >
                        Confirm
                    </IconButton>
                </div>
            </div>
        )
    }

    const panelOpen = () => {
        if (storehouse.data.length !== 0 && panel === false) {
            setPanel(true);
        }
    }

    const getTableData = useCallback((data) => {
        setInfo(data);
    }, [])

    const opnameConfirmation = async () => {
        const request = {
            user: auth.user.id,
            note: "Stock Opname"
        }
        try {
            await axios.post('transactions/opname-confirmation', request);

            Notification.success({
                title: "Success",
                description: "Berhasil melakukan Stock Opname"
            })
            setReloadTable(!reloadTable);
            setAnimateIn(false);
            setTimeout(() => {
                setAnimateIn(true);
                setPanel(false);
                setTogglePage(false);
                storehouseReset();
            }, 600)
        } catch (e) {
            Notification.error({
                title: "Error",
                description: "Oops!! Something Wrong"
            })
        }
    }

    useEffect(() => {
        if (togglePage) {
            if (panel) {
                setAnimateIn(false)
                setTimeout(() => {
                    setAnimateIn(true);
                    setPanel(true);
                    setStorehouse({ ...storehouse, type: 'opname' })
                }, 600);
            } else {
                setPanel(true);
                setStorehouse({ ...storehouse, type: 'opname' })
            }
        } else {
            if (panel) {
                setTimeout(() => {
                    storehouseReset();
                    setPanel(false);
                }, 600);
            } else {
                // storehouseReset();
                setStorehouse({ ...storehouse, type: 'restock' })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [togglePage])

    useEffect(() => {
        panelOpen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storehouse])

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
                                        {/* {togglePage ? <TableStockOpname /> : <TableStoreHouse />} */}
                                        <TableStoreHouse info={getTableData} reload={reloadTable} />
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
                                            panel && (
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
