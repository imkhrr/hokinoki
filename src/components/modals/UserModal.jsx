import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification } from "rsuite";
import { userModal } from "../../store/Modal";

const UserModal = (props) => {

    const [modalData, setModalData] = useRecoilState(userModal);
    const resetModal = useResetRecoilState(userModal);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState(true)

    const request = { name, username, changePassword, password };

    const modalClose = () => {
        setModalData({ ...modalData, show: false })
        setTimeout(() => {
            resetModal();
            setChangePassword(true)
        }, 300);
    }

    const insertData = async () => {
        try {
            let { data } = await axios.post(`users`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: 'Data pengguna berhasil disimpan'
            })
            console.log(data);
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
            await axios.patch(`users/${modalData.formData.id}`, request)
            setModalData({ ...modalData, eventSuccess: true })
            Notification.success({
                title: 'Sukses',
                description: 'Data pengguna berhasil diupdate'
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
        setName(modalData.formData.name);
        setUsername(modalData.formData.username);
        setPassword(modalData.formData.password);
        if (modalData.update) {
            setChangePassword(false)
        }
    }, [modalData.formData, modalData.update])

    return (
        <Modal backdrop="static" size={modalData.size} show={modalData.show} onHide={modalClose} >
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
                        <ControlLabel>Username</ControlLabel>
                        <FormControl onChange={(val) => setUsername(val)} value={username || ""} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        {
                            !changePassword ?
                                <Button onClick={() => setChangePassword(!changePassword)} appearance="primary" color="red" block> Ganti Password </Button>
                                :
                                <FormControl type="password" onChange={(val) => setPassword(val)} value={password || ""} />
                        }
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

export default UserModal;
