import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from "rsuite";

import TableCheckout from "../../components/tables/transactions/TableCheckout";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const checkoutData = [
      {
        id: 1,
        name: "Nanas",
        count: 2,
        price: "5.000",
        subtotal: "10.000",
      },
      {
        id: 2,
        name: "Anggur Merah",
        count: 2,
        price: "75.000",
        subtotal: "150.000",
      },
    ];

    return (
      <Grid fluid>
        <Row className="animate__animated animate__fadeIn">
          <Col xs={24} sm={24} md={17} className="px-0px">
            <div className="pb-2">
              <span className="t3 pr-1">Checkout</span>
            </div>
            <div className="pb-2" style={{ paddingTop: 4 }}>
              <TableCheckout listdata={checkoutData} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} className="px-0px">
            <div className="pl-2">
              <div className="pb-2">
                <span className="t3 pr-1">Data Pelanggan</span>
              </div>
              <div style={{ paddingTop: 4 }}>
                {" "}
                <Panel className="is-bg-white" style={{ minHeight: "69vh" }}>
                  <Form fluid className="pt-2">
                    <FormGroup>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl size="sm" name="name" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Tanggal Transaksi</ControlLabel>
                      <FormControl size="sm" name="date" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>No. Struk</ControlLabel>
                      <FormControl size="sm" name="struk" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Catatan</ControlLabel>
                      <FormControl
                        size="sm"
                        rows={4}
                        name="textarea"
                        componentClass="textarea"
                      />
                    </FormGroup>
                    <div className="flex jc-sb pt-4">
                      <span>Total Bayar</span>
                      <div>
                        <span>Rp. </span>
                        <span className="bold">160.000</span>
                      </div>
                    </div>
                  </Form>
                </Panel>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Checkout;
