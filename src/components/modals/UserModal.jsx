import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Notification, SelectPicker } from "rsuite";
import { userModal } from "../../store/Modal";

const UserModal = (props) => {

    const [modalData, setModalData] = useRecoilState(userModal);
    const resetModal = useResetRecoilState(userModal)

    const [name, setName] = useState('');
    // const [role, setRole] = useState([]);
    // const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState(true)

    const request = { name, username, changePassword, password };

    const modalClose = () => {
        setChangePassword(true)
        setModalData({ ...modalData, show: false })
        setTimeout(() => {
            resetModal();
        }, 300);
    }

    // const modalShow = () => {
    //     setRole([]);
    // }

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
            let { data } = await axios.patch(`users/${modalData.formData.id}`, request)
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

    // useEffect(() => {

    //     axios.get('dropdown/roles')
    //         .then((response) => {
    //             setRoles(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    // // }, [])
    // useEffect(() => {
    //     setChangePassword(true);
    // }, [changePassword])

    useEffect(() => {
        setName(modalData.formData.name);
        setUsername(modalData.formData.username);
        setPassword(modalData.formData.password);
        if (modalData.update) {
            //     setRole(modalData.formData.roles[0].id)
            setChangePassword(false)
        }
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
                        <FormControl onChange={(val) => setName(val)} value={name || ""} />
                    </FormGroup>
                    {/* <FormGroup>
                        <ControlLabel>Role</ControlLabel>
                        <SelectPicker
                            data={roles}
                            placeholder="Pilih jabatan"
                            valueKey="id"
                            onChange={(e) => setRole(e)}
                            value={role || ""}
                            cleanable={false}
                            searchable={false}
                            block
                        />
                    </FormGroup> */}
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
