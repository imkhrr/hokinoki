import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification, InputNumber, SelectPicker } from "rsuite";
import { itemModal } from "../../store/Modal";

const ItemModal = (props) => {

    const [modalData, setModalData] = useRecoilState(itemModal);
    const resetModal = useResetRecoilState(itemModal)

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState([]);
    const [unit, setUnit] = useState([]);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const request = { 
        name, 
        stock,
        sell_price : price, 
        unit_id : unit, 
        type_id : category
    };

    const modalClose = () => {
        setModalData({ ...modalData, show: false })
        setTimeout(() => {
            resetModal();
        }, 300);
    }

    const modalShow = () => {
        setCategory([]);
        setUnit([]);
    }


    const insertData = async () => {
        try {
            let { data } = await axios.post(`commodities`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: data.message
            })
            modalClose();
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal menyimpan data'
            })
        }
    }

    const updateData = async () => {
        try {
            let { data } = await axios.patch(`commodities/${modalData.formData.id}`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: data.message
            })
            modalClose();
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal update data'
            })
        }
    }

    const saveData = () => {
        console.log(request);
        if (modalData.update) {
            updateData();
        } else {
            insertData();
        }
    }

    useEffect(() => {
        axios.get('dropdown/commodity-units')
            .then((response) => {
                setUnits(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            axios.get('dropdown/commodity-types')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    useEffect(() => {
        setName(modalData.formData.name);
        setPrice(modalData.formData.sell_price);
        setStock(modalData.formData.stock);
        if (modalData.update) {
            setCategory(modalData.formData.commodity_type.id)
            setUnit(modalData.formData.commodity_unit.id)
        }
    }, [modalData.formData, modalData.update])

    return (
        <Modal backdrop="static" size={modalData.size} show={modalData.show} onHide={modalClose} onShow={modalShow}>
            <Modal.Header>
                <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <InputNumber style={{ width: "170px" }} prefix="Rp." onChange={(val) => setPrice(parseInt(val))} value={price || 0} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Stock</ControlLabel>
                        <InputNumber style={{ width: "170px" }} onChange={(val) => setStock(parseInt(val))} value={stock || 0} disabled={modalData.update}/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveData} appearance="primary" block> Simpan </Button>
                <Button onClick={modalClose} appearance="default" block> Batal </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemModal;
