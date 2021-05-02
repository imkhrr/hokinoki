import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
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
        <Row>
          <Col xs={24} sm={24} md={18}>
            <div className="pb-2">
              <span className="t2 pr-1">Checkout</span>
            </div>
            <div className="pb-2">
              <TableCheckout listdata={checkoutData} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <div className="pb-2">
              <span className="t2 pr-1">Data Pelanggan</span>
            </div>
            <Panel style={{ minHeight: "69vh" }} bordered>
              <Form fluid className="pt-2">
                <FormGroup>
                  <ControlLabel>Nama</ControlLabel>
                  <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tanggal Transaksi</ControlLabel>
                  <FormControl name="date" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>No. Struk</ControlLabel>
                  <FormControl name="struk" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Catatan</ControlLabel>
                  <FormControl
                    rows={3}
                    name="textarea"
                    componentClass="textarea"
                  />
                </FormGroup>
                <div className="flex jc-sb">
                  <span>Total Bayar</span>
                  <div>
                    <span>Rp. </span>
                    <span className="bold">160.000</span>
                  </div>
                </div>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Checkout;
