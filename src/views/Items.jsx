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
  InputNumber,
} from "rsuite";
import TableItems from "../components/tables/TableItems";
import AddModal from "../components/AddModal";

class Items extends Component {
  state = {
    showModal: false,
  };
  render() {
    const itemsData = [
      {
        id: 1,
        name: "Nanas",
        category: "Buah",
        price: "5.000",
        stock: "15",
      },
      {
        id: 2,
        name: "Anggur Merah",
        category: "Minuman",
        price: "75.000",
        stock: "999",
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
              <NavigasiBar title="Items" />
              <AddModal
                title="Tambah Barang"
                size="xs"
                content={
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl name="name" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Kategori</ControlLabel>
                      <FormControl name="category" />
                    </FormGroup>

                    <Form className="flex jc-sb" fluid>
                      <FormGroup>
                        <ControlLabel>Harga</ControlLabel>
                        <InputNumber style={{ width: "170px" }} prefix="Rp." />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Stock</ControlLabel>
                        <InputNumber style={{ width: "170px" }} />
                      </FormGroup>
                    </Form>
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
                    <span className="t3 pr-1">Data Barang</span>
                  </div>
                  <div>
                    <TableItems listdata={itemsData} />
                  </div>
                </div>

                <div className="flex jc-sb pt-2">
                  <div></div>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    appearance="primary"
                    onClick={() => this.setState({ showModal: true })}
                  >
                    Tambah Barang
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

export default Items;
