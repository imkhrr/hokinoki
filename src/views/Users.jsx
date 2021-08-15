import React, { useCallback, useState } from "react";
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
    Button,
} from "rsuite";
import TableUsers from "../components/tables/TableUsers";
import SaveModal from "../components/modals/SaveModal";
import axios from "axios";

function Users() {

    // MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [addModal, setAddModal] = useState(true);

    // DATA PROCESSING STATE
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const [tableReload, setTableReload] = useState(false);

    // REQUEST SEND VARIABLE
    const request = { name, username, changePassword, password };

    // DATA PROCESSING
    const insertData = async () => {
        try {
            await axios.post(`users`, request)
            Notification.success({
                title: 'Sukses',
                description: 'Data Pengguna Berhasil Ditambah'
            })
            setShowModal(false);
            setTableReload(true);
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal menyimpan data'
            })
        }
    }

    const updateData = async () => {
        try {
            await axios.patch(`users/${id}`, request)
            Notification.success({
                title: 'Sukses',
                description: 'Data Pengguna Berhasil Diedit'
            })
            setShowModal(false);
            setTableReload(true);
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Terjadi kesalahan, gagal edit data'
            })
        }
    }

    const saveData = () => {
        if (addModal) {
            insertData();
        } else {
            updateData();
        }
        setTableReload(false);
    }

    // MODAL DATA ON SHOW
    const editModal = useCallback((data) => {
        setAddModal(false);
        setShowModal(true);
        setId(data.id);
        setName(data.name);
        setUsername(data.username);
        if (!changePassword) {
            setPassword(data.password);
            setChangePassword(true)
        }
    }, [changePassword])

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
                        <NavigasiBar title="Users" />
                        <div className="p-3 animate__animated animate__fadeIn">
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2">
                                    <span className="t3 pr-1">Data Pengguna</span>
                                </div>
                                <div>
                                    <TableUsers onEdit={(e) => editModal(e)} reload={tableReload} />
                                </div>
                            </div>

                            <div className="flex jc-sb px-5px pt-2">
                                <div></div>
                                <IconButton
                                    icon={<Icon icon="plus" />}
                                    appearance="primary"
                                    onClick={(e) => {
                                        setShowModal(true);
                                        setAddModal(true);
                                        setId('');
                                        setName('');
                                        setUsername('');
                                        setPassword('');
                                        setChangePassword(true);
                                    }}
                                >
                                    Tambah Pengguna
                                </IconButton>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
            <SaveModal
                show={showModal}
                title={`${addModal ? 'Tambah' : 'Edit'} Data Pengguna`}
                onClose={(e) => setShowModal(e)}
                save={saveData}
            >
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl onChange={(val) => setName(val)} value={name || ""} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl onChange={(val) => setUsername(val)} value={username || ""} autoComplete="username"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        {
                            !addModal && changePassword ?
                                <Button onClick={() => setChangePassword(!changePassword)} appearance="primary" color="red" block> Ganti Password </Button>
                                :
                                <FormControl type="password" onChange={(val) => setPassword(val)} value={password || ""} autoComplete="new-password" />
                        }
                    </FormGroup>
                </Form>
            </SaveModal>
        </div>
    );
}


export default Users;
