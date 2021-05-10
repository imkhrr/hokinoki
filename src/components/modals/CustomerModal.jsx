import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification } from "rsuite";
import { customerModal } from "../../store/Modal";

const CustomerModal = (props) => {

    const [modalData, setModalData] = useRecoilState(customerModal);
    const [name, setName] = useState('');
    const [address, setAdrress] = useState('');
    const [contact1, setContact1] = useState('');

    const request = { name, address, contact1 };

    const modalClose = () => {
        setModalData({
            ...modalData,
            show: false,
            formData: [],
            eventSuccess: false
        });
    }

    const formData = () => {
        setName(modalData.formData.name);
        setAdrress(modalData.formData.address);
        setContact1(modalData.formData.contact_1);

    }

    const insertData = async () => {
        try {
            let { data } = await axios.post(`customers`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: 'Data pelanggan berhasil disimpan'
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
            let { data } = await axios.patch(`customers/${modalData.formData.id}`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: 'Data pelanggan berhasil diupdate'
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
        if (modalData.update) {
            updateData();
        } else {
            insertData();
        }
    }

    useEffect(() => {
        formData();
    }, [modalData.formData])

    return (
        <Modal backdrop="static" size={modalData.size} show={modalData.show} onHide={modalClose} >
            <Modal.Header>
                <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl name="name" onChange={(val) => setName(val)} value={name} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Alamat</ControlLabel>
                        <FormControl name="address" onChange={(val) => setAdrress(val)} value={address} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>No. HP</ControlLabel>
                        <FormControl name="phone" onChange={(val) => setContact1(val)} value={contact1} />
                    </FormGroup>
                </Form></Modal.Body>
            <Modal.Footer>
                <Button onClick={saveData} appearance="primary" block> Simpan </Button>
                <Button onClick={modalClose} appearance="default" block> Batal </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomerModal;
