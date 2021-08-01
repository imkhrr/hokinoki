import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useRecoilValue } from "recoil";
import {
    Grid,
    Row,
    Col,
    Panel,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    DatePicker,
    InputGroup,
    Input,
} from "rsuite";

import TableCheckout from "../../components/tables/transactions/TableCheckout";
import { Cart } from "../../store/Trans";

function Checkout() {

    const checkoutCart = useRecoilValue(Cart);
    const [cash, setCash] = useState(0);
    const [date, setDate] = useState(new Date);
    const [discount, setDiscount] = useState(0)

    const payAmount = () => {
        let total = 0;

        checkoutCart.map((val, index) => {
            total = total + parseInt(val["count"] * val["price"]);
        })

        if (discount > 0) {
            total = total - parseInt(discount)
        }

        return total;
    }

    const moneyChange = () => {
        let res = 0

        if (cash > 0) {
            res = parseInt(cash) - payAmount();
        }

        return res;
    }

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    return (
        <Grid fluid>
            <Row className="animate__animated animate__fadeIn">
                <Col xs={24} sm={24} md={17} className="px-0px">
                    <div className="pb-2">
                        <span className="t3 pr-1">Checkout</span>
                    </div>
                    <div className="pb-2" style={{ paddingTop: 4 }}>
                        <TableCheckout />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} className="px-0px">
                    <div className="pl-2">
                        <div className="pb-2">
                            <span className="t3 pr-1">Struk Pembayaran</span>
                        </div>
                        <div style={{ paddingTop: 4 }}>
                            {" "}
                            <Panel className="is-bg-white" style={{ minHeight: "69vh" }}>
                                <Form fluid className="pt-2">
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>No. Struk</ControlLabel>
                                                <FormControl size="sm" name="struk" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Tanggal</ControlLabel>
                                                <DatePicker oneTap block
                                                    cleanable={false}
                                                    ranges={[]}
                                                    size="sm"
                                                    placeholder="Tanggal"
                                                    placement="auto"
                                                    value={date}
                                                    onChange={(value) => { setDate(value) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <ControlLabel>Nama</ControlLabel>
                                        <FormControl size="sm" name="Nama" />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Jumlah Uang</ControlLabel>
                                        <InputGroup size="sm" style={{ width: '100%' }}>
                                            <NumberFormat
                                                placeholder='Rp. 0'
                                                style={{ textAlign: 'right' }}
                                                className='rs-input'
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'Rp. '}
                                                onValueChange={(val) => { setCash(val.floatValue) }}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Diskon</ControlLabel>
                                        <InputGroup size="sm" style={{ width: '100%' }}>
                                            <NumberFormat
                                                placeholder='Rp. 0'
                                                style={{ textAlign: 'right' }}
                                                className='rs-input'
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'Rp. '}
                                                onValueChange={(val) => { setDiscount(val.floatValue) }}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Catatan</ControlLabel>
                                        <FormControl
                                            size="sm"
                                            rows={2}
                                            name="textarea"
                                            componentClass="textarea"
                                        />
                                    </FormGroup>
                                    <div className="flex jc-sb pt-3">
                                        <span>Total Bayar</span>
                                        <div>
                                            {/* <span>Rp. </span> */}
                                            <span className="bold">{curr.format(payAmount())}</span>
                                        </div>
                                    </div>
                                    <div className="flex jc-sb">
                                        <span>Dibayar</span>
                                        <div>
                                            {/* <span>Rp. </span> */}
                                            <span className="bold">{curr.format(cash ?? 0)}</span>
                                        </div>
                                    </div>
                                    <div className="flex jc-sb">
                                        <span>Kembali</span>
                                        <div>
                                            {/* <span>Rp. </span> */}
                                            <span className="bold">{curr.format(moneyChange())}</span>
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

export default Checkout;
