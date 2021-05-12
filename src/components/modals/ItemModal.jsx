import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification, InputNumber, SelectPicker, InputPicker } from "rsuite";
import { itemModal } from "../../store/Modal";

const ItemModal = (props) => {

    const [modalData, setModalData] = useRecoilState(itemModal);
    const [categories, setCategories] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const request = { name, price };

    const modalClose = () => {
        setModalData({
            ...modalData,
            show: false,
            formData: [],
            update: false,
            eventSuccess: false
        });
    }

    const modalShow = async () => {
        setCategory("");
        try {
            let { data } = await axios.get('info/commodity-types');
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
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
        const formData = () => {
            setName(modalData.formData.name);
            if (modalData.update) {
                setCategory(modalData.formData.commodity_type.id)
            }
            setPrice(modalData.formData.sell_price);
            setStock(modalData.formData.stock);
        }
        formData();
        console.log(modalData);
    }, [modalData.formData])

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
                        <InputPicker
                            data={Object.values(categories)}
                            placeholder="pilih kategori"
                            valueKey="id"
                            onSelect={(e) => setCategory(e)}
                            value={category || ""}
                            cleanable={true}
                            block
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Kategori</ControlLabel>
                        <FormControl readOnly />
                    </FormGroup>
                </Form>
                <Form className="flex jc-sb" fluid>
                    <FormGroup>
                        <ControlLabel>Harga</ControlLabel>
                        <InputNumber style={{ width: "170px" }} prefix="Rp." onChange={(val) => setPrice(val)} value={price || ""} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Stock</ControlLabel>
                        <InputNumber style={{ width: "170px" }} onChange={(val) => setStock(val)} value={stock || ""} />
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
