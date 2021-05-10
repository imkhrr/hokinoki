import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification, InputNumber } from "rsuite";
import { itemModal } from "../../store/Modal";

const ItemModal = (props) => {

    const [modalData, setModalData] = useRecoilState(itemModal);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const request = { name, price };

    const modalClose = () => {
        setModalData({
            ...modalData,
            show: false,
            formData: [],
            eventSuccess: false
        });
    }

    const formData = () => {
        console.log(modalData);
        setName(modalData.formData.name);
        // setCategory(modalData.formData.commodity_type.name);
        setPrice(modalData.formData.sell_price);
        setStock(modalData.formData.stock);

    }

    const insertData = async () => {
        try {
            let { data } = await axios.post(`commodities`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: 'Data barang berhasil disimpan'
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
                description: 'Data barang berhasil diupdate'
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
        formData();
    }, [modalData])

    return (
        <Modal backdrop="static" size={modalData.size} show={modalData.show} onHide={modalClose} >
            <Modal.Header>
                <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl onChange={(val) => setName(val)} value={name} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Kategori</ControlLabel>
                        <FormControl onChange={(val) => setCategory(val)} value={category} readOnly={true} />
                    </FormGroup>

                    <Form className="flex jc-sb" fluid>
                        <FormGroup>
                            <ControlLabel>Harga</ControlLabel>
                            <InputNumber style={{ width: "170px" }} prefix="Rp." onChange={(val) => setPrice(val)} value={price}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Stock</ControlLabel>
                            <InputNumber style={{ width: "170px" }} onChange={(val) => setStock(val)} value={stock}/>
                        </FormGroup>
                    </Form>
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
