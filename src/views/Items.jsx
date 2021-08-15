import React, { useEffect, useRef, useState } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import {
    Col,
    Row,
    Grid,
    Icon,
    IconButton,
    InputGroup,
    Input,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    SelectPicker,
    Notification,
    Button
} from "rsuite";
import TableItems from "../components/tables/TableItems";
import SaveModal from "../components/modals/SaveModal";
import axios from "axios";
import NumberFormat from "react-number-format";

function Items() {

    // MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [addModal, setAddModal] = useState(true);

    // DATA PROCESSING STATE
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [units, setUnits] = useState([]);
    const [unit, setUnit] = useState([]);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const [tableReload, setTableReload] = useState(false);

    // SEARCHING STATE
    const [search, setSearch] = useState('');
    const [inputVal, setInputVal] = useState('');
    const searchInput = useRef(null);

    // REQUEST SEND VARIABLE 
    const request = {
        name,
        stock,
        sell_price: price,
        unit_id: unit,
        type_id: category
    };

    const searchShortcut = ({ key }) => {
        if (key.match(/^[0-9a-zA-Z]+$/) && !showModal) {
            searchInput.current.focus();
        }
    }

    // DATA PROCESSING
    const insertData = async () => {
        try {
            await axios.post(`commodities`, request);
            Notification.success({
                title: 'Success',
                description: "Data Barang Berhasil Ditambah"
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
            await axios.patch(`commodities/${id}`, request);
            Notification.success({
                title: 'Success',
                description: "Data Barang Berhasil Diedit"
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
        setPrice(data.sell_price);
        setStock(data.stock);
        if (!addModal) {
            setCategory(data.commodity_type.id);
            setUnit(data.commodity_unit.id);
        }
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

    // GET DROPDOWN DATA
    useEffect(() => {
        axios.get('dropdown/commodity-units')
            .then((response) => {
                setUnits(response.data);
            })
            .catch((error) => {
                console.log("Gagal Memuat Data Unit Barang ");
            });
        axios.get('dropdown/commodity-types')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log("Gagal Memuat Data Kategori Barang");
            });
    }, [])

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
                        <NavigasiBar title="Barang" />
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2 flex jc-sb">
                                    <span className="t3 pr-1">Data Barang</span>
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
                                <div>
                                    <TableItems search={search} onEdit={(e) => editModal(e)} reload={tableReload} />
                                </div>
                            </div>

                            <div className="flex jc-sb pt-2">
                                <div></div>
                                <IconButton
                                    icon={<Icon icon="plus" />}
                                    appearance="primary"
                                    onClick={() => {
                                        setAddModal(true)
                                        setShowModal(true)
                                        setName('')
                                        setPrice('')
                                        setStock('')
                                        setCategory('')
                                        setUnit('')
                                    }}
                                >
                                    Tambah Barang
                                </IconButton>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
            <SaveModal
                show={showModal}
                title={`${addModal ? 'Tambah' : 'Edit'} Data Barang`}
                onClose={(e) => setShowModal(e)}
                save={saveData}
                footerAddOn={!addModal &&
                    <Button appearance="primary" style={{ float: "left" }} onClick={() => setAddModal(true)}>
                        Jadikan Barang Baru
                    </Button>
                }
            >
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl onChange={(val) => setName(val)} value={name || ""} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Kategori</ControlLabel>
                        <SelectPicker
                            data={categories}
                            placeholder="Pilih Kategori"
                            valueKey="id"
                            onChange={(e) => setCategory(e)}
                            value={category || []}
                            cleanable={false}
                            searchable={false}
                            block
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Unit</ControlLabel>
                        <SelectPicker
                            data={units}
                            placeholder="Pilih Unit"
                            valueKey="id"
                            onChange={(e) => setUnit(e)}
                            value={unit || []}
                            cleanable={false}
                            searchable={false}
                            block
                        />
                    </FormGroup>
                </Form>
                <Form className="flex jc-sb" fluid>
                    <FormGroup>
                        <ControlLabel>Harga</ControlLabel>
                        <InputGroup style={{ width: "250px" }}>
                            <InputGroup.Addon>Rp. </InputGroup.Addon>
                            <NumberFormat
                                style={{ textAlign: 'right' }}
                                placeholder={0}
                                className='rs-input'
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                onValueChange={(val) => setPrice(val.floatValue)}
                                value={price}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Stock</ControlLabel>
                        <NumberFormat
                            style={{ width: "90px", textAlign: 'right' }}
                            placeholder={0}
                            className='rs-input'
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            onValueChange={(val) => setStock(val.floatValue)}
                            value={stock}
                            disabled={!addModal} />
                    </FormGroup>
                </Form>
            </SaveModal>
        </div>
    );
}

export default Items;
