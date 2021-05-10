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
import TableItems from "../components/tables/TableItems";
import ItemModal from "../components/modals/ItemModal";
import { useRecoilState } from "recoil";
import { itemModal } from "../store/Modal";

function Items() {

    const [modal, setModal] = useRecoilState(itemModal);

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
                        <NavigasiBar title="Items" />
                        <ItemModal />
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2">
                                    <span className="t3 pr-1">Data Barang</span>
                                </div>
                                <div>
                                    <TableItems />
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
                                            title: 'Tambah Data Barang',
                                            show: true,
                                            formData: [],
                                            update: false
                                        })
                                    }}
                                >
                                    Tambah Barang
                                    </IconButton>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Items;
