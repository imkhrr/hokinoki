import React from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Icon,
  IconButton,
} from "rsuite";

import TableCheckout from "../../components/tables/transactions/TableCheckout";

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

const Checkout = (props) => {
  return (
    <div>
      <Grid fluid>
        <Row className="animate__animated animate__fadeIn animate__fast">
          <Col xs={24} sm={24} md={17} className="pl-0px">
            <div className="pb-2">
              <span className="t3 pr-1">Checkout</span>
            </div>
            <div style={{ paddingTop: 4 }}>
              <TableCheckout listdata={checkoutData} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} className="pr-0px pb-3">
            <div>
              <div className="pb-2">
                <span className="t3 pr-1">Data Pelanggan</span>
              </div>
              <div style={{ paddingTop: 4 }}>
                <Panel className="is-bg-white" style={{ minHeight: 400 }}>
                  <Form fluid>
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
                        rows={3}
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
      <div className="flex jc-sb">
        <IconButton
          icon={<Icon icon="ban" />}
          appearance="default"
          onClick={props.onBack}
        >
          Cancel
        </IconButton>
        <IconButton
          icon={<Icon icon="save" />}
          appearance="primary"
          color="green"
          style={{ width: 315 }}
          onClick={props.onNext}
        >
          Simpan
        </IconButton>
      </div>
    </div>
  );
};

export default Checkout;
