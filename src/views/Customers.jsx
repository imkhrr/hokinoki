import React, { useEffect, useRef, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import {
    Col,
    Row,
    Grid,
    Icon,
    IconButton,
    Notification,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    InputGroup,
    Input
} from "rsuite";
import TableCustomers from "../components/tables/TableCustomers";
import axios from "axios";
import SaveModal from "../components/modals/SaveModal";

function Customers(props) {

    // MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [addModal, setAddModal] = useState(true);

    // DATA PROCESSING STATE
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAdrress] = useState('');
    const [contact1, setContact1] = useState('');
    const [contact2, setContact2] = useState('');

    const [tableReload, setTableReload] = useState(false);

    // SEARCHING STATE
    const [search, setSearch] = useState('');
    const [inputVal, setInputVal] = useState('');
    const searchInput = useRef(null);

    // REQUEST SEND VARIABLE
    const request = { name, address, contact1, contact2 };

    const searchShortcut = ({ key }) => {
        if (key.match(/^[0-9a-zA-Z]+$/) && !showModal) {
            searchInput.current.focus();
        }
    }

    // DATA PROCESSING
    const insertData = async () => {
        try {
            await axios.post(`customers`, request);
            Notification.success({
                title: 'Success',
                description: "Data Pelanggan Berhasil Ditambah"
            });
            setShowModal(false);
            setTableReload(true);
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal menyimpan data'
            });
        }
    }

    const updateData = async () => {
        try {
            await axios.patch(`customers/${id}`, request);
            Notification.success({
                title: 'Success',
                description: "Data Pelanggan Berhasil Diedit"
            });
            setShowModal(false);
            setTableReload(true);
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal edit data'
            });
        }
    }

    const saveData = () => {
        if (addModal) {
            insertData();
        } else {
            updateData();
        }
        setTableReload(false)
    }

    // MODAL DATA ON SHOW
    const editModal = (data) => {
        setAddModal(false);
        setShowModal(true);
        setId(data.id);
        setName(data.name);
        setAdrress(data.address);
        setContact1(data.contact_1);
        setContact2(data.contact_2);
    }

    // SEARCH INPUT ON FOCUS
    useEffect(() => {
        window.addEventListener("keydown", searchShortcut);
        return () => {
            window.removeEventListener("keydown", searchShortcut);
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => setSearch(inputVal), 500);
        return () => clearTimeout(timeout);
    }, [inputVal])


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
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2 flex jc-sb">
                                    <span className="t3 pr-1">Data Pelanggan</span>
                                    <div className="flex jc-sb ai-c">
                                        <InputGroup size="xs">
                                            <Input
                                                placeholder="Search"
                                                onChange={(e) => { setInputVal(e) }}
                                                inputRef={searchInput}
                                            />
                                            <InputGroup.Addon>
                                                <Icon icon="search" />
                                            </InputGroup.Addon>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <TableCustomers search={search} onEdit={(e) => editModal(e)} reload={tableReload} />
                                </div>
                            </div>
                            <div className="flex jc-sb pt-1">
                                <div></div>
                                <IconButton
                                    icon={<Icon icon="plus" />}
                                    appearance="primary"
                                    onClick={(e) => { 
                                        setAddModal(true)
                                        setShowModal(true)
                                        setId('')
                                        setName('');
                                        setAdrress('');
                                        setContact1('');
                                        setContact2('');
                                    }}
                                >
                                    Tambah Pelanggan
                                </IconButton>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
            <SaveModal
                show={showModal}
                title={`${addModal ? 'Tambah' : 'Edit'} Data Pelanggan`}
                onClose={(e) => setShowModal(e)}
                save={saveData}
            >
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl
                            placeholder="Nama Pelanggan"
                            onChange={(val) => setName(val)}
                            value={name || ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>No. HP</ControlLabel>
                        <FormControl
                            placeholder="Nomor Handphone 1"
                            onChange={(val) => setContact1(val)}
                            value={contact1 || ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            placeholder="Nomor Handphone 2"
                            onChange={(val) => setContact2(val)}
                            value={contact2 || ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Alamat</ControlLabel>
                        <FormControl
                            placeholder="Alamat Lengkap"
                            componentClass="textarea"
                            rows={4}
                            name="address"
                            onChange={(val) => setAdrress(val)}
                            value={address || ""}
                        />
                    </FormGroup>
                </Form>
            </SaveModal>
        </div>
    );
}

export default Customers;
