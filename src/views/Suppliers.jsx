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
import TableSuppliers from "../components/tables/TableSuppliers";
import AddModal from "../components/AddModal";

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const suppliersData = [
      {
        id: 1,
        name: "Wildan Affandi",
        items: "Tomat, Selada, Bawang",
        address: "Jl. Bintang",
      },
      {
        id: 1,
        name: "Putra Buah",
        items: "Apel, Jeruk, Semangka",
        address: "Jl. Jupiter",
      },
      {
        id: 1,
        name: "PT. Indofood",
        items: "Bumbu jadi",
        address: "Jl. Surya Kencana",
      },
      {
        id: 1,
        name: "PT. Kapal Api",
        items: "Kopi Sachet",
        address: "Jl. Apel",
      },
    ];
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
                title="Tambah Suppliers"
                size="xs"
                content={
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl name="name" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Barang</ControlLabel>
                      <FormControl name="items" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Alamat</ControlLabel>
                      <FormControl name="address" />
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
                  <span className="t2 pr-1">Data Suppliers</span>
                </div>
                <div>
                  <TableSuppliers listdata={suppliersData} />
                </div>
              </div>

              <div className="flex jc-sb px-5px pt-2">
                <div></div>
                <IconButton
                  icon={<Icon icon="plus" />}
                  appearance="primary"
                  onClick={() => this.setState({ showModal: true })}
                >
                  Tambah Suppliers
                </IconButton>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Suppliers;
