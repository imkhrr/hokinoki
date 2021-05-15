import React from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import {
    Col,
    Row,
    Grid,
    Icon,
    IconButton
} from "rsuite";
import TableCustomers from "../components/tables/TableCustomers";
import { useRecoilState } from "recoil";
import CustomerModal from "../components/modals/CustomerModal";
import { customerModal } from "../store/Modal";

function Customers(props) {

    const [modal, setModal] = useRecoilState(customerModal);

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
                        <NavigasiBar title="Pelanggan" />
                        <CustomerModal />
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2">
                                    <span className="t3 pr-1">Data Pelanggan</span>
                                </div>
                                <div className="pb-2">
                                    <TableCustomers />
                                </div>
                            </div>
                            <div className="flex jc-sb pt-2">
                                <div></div>
                                <IconButton
                                    icon={<Icon icon="plus" />}
                                    appearance="primary"
                                    onClick={(e) => { 
                                        setModal({ 
                                            ...modal,
                                            title: 'Tambah Data Pelanggan',
                                            show: true, 
                                            formData: [], 
                                            update: false 
                                        }) 
                                    }}
                                >
                                    Tambah Pelanggan
                                </IconButton>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Customers;
