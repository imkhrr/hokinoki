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
import TableCustomers from "../components/tables/TableCustomers";
import AddModal from "../components/AddModal";

class Customers extends Component {
  state = {
    showModal: false,
  };
  render() {
    const customersData = [
      {
        id: 1,
        name: "Harjendra Nugraha",
        address: "Jl. Merpati",
        contact: "085607903567",
      },
      {
        id: 2,
        name: "Galih Buana Aji",
        address: "Jl. Melati",
        contact: "085604503577",
      },
      {
        id: 3,
        name: "Yordan Wili",
        address: "Jl. Merak",
        contact: "085607912347",
      },
    ];
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
              <NavigasiBar title="Customers" />
              <AddModal
                title="Tambah Customer"
                size="xs"
                content={
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl name="name" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Alamat</ControlLabel>
                      <FormControl name="address" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>No. HP</ControlLabel>
                      <FormControl name="phone" />
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
                    <span className="t3 pr-1">Data Customers</span>
                  </div>
                  <div className="pb-2">
                    <TableCustomers listdata={customersData} />
                  </div>
                </div>

                <div className="flex jc-sb pt-2">
                  <div></div>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    appearance="primary"
                    onClick={() => this.setState({ showModal: true })}
                  >
                    Tambah User
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

export default Customers;
