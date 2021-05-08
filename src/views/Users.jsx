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
        <Grid fluid>
          <Row>
            <Col xsHidden smHidden xs={24} sm={24} md={4} className="px-0px">
              <div className="pr-1">
                <SideBar />
              </div>
            </Col>
            <Col xs={24} sm={24} md={20} className="px-0px">
              <NavigasiBar title="Users" />
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
              <div className="p-3 animate__animated animate__fadeIn">
                <div style={{ minHeight: "77vh" }}>
                  <div className="pb-2">
                    <span className="t3 pr-1">Data Pengguna</span>
                  </div>
                  <div>
                    <TableUsers />
                  </div>
                </div>

                <div className="flex jc-sb px-5px pt-2">
                  <div></div>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    appearance="primary"
                    onClick={() => this.setState({ showModal: true })}
                  >
                    {" "}
                    Tambah User{" "}
                  </IconButton>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Users;
