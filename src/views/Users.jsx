import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import {
    Col,
    Row,
    Grid,
    Icon,
    IconButton,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
} from "rsuite";
import TableUsers from "../components/tables/TableUsers";
import AddModal from "../components/AddModal";

class Users extends Component {
    state = {
        showModal: false,
    };
    render() {
        const showModal = this.state.showModal;
        return (
            <div>
                <NavigasiBar />
                <Grid fluid>
                    <Row className="px-2 py-2">
                        <Col xsHidden smHidden xs={24} sm={24} md={4}>
                            <div className="pr-4">
                                <SideBar />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={20}>
                            <AddModal
                                title="Tambah User"
                                size="xs"
                                content={
                                    <Form fluid>
                                        <FormGroup>
                                            <ControlLabel>Nama</ControlLabel>
                                            <FormControl name="name" />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Role</ControlLabel>
                                            <FormControl name="role" />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Username</ControlLabel>
                                            <FormControl name="username" />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Password</ControlLabel>
                                            <FormControl name="password" />
                                        </FormGroup>
                                    </Form>
                                }
                                yes={() => this.setState({ showModal: false })}
                                no={() => this.setState({ showModal: false })}
                                show={showModal}
                                onHide={() => this.setState({ showModal: false })}
                            />
                            <div style={{ minHeight: "77vh" }}>
                                <div className="pb-2">
                                    <span className="t2 pr-1">Data Pengguna</span>
                                </div>
                                <div>
                                    <TableUsers />
                                </div>
                            </div>

                            <div className="flex jc-sb px-5px pt-2">
                                <div></div>
                                <IconButton icon={<Icon icon="plus" />} appearance="primary" onClick={() => this.setState({ showModal: true })} > Tambah User </IconButton>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Users;
