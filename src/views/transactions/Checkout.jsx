import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
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
    Toggle,
    Icon,
    SelectPicker,
    IconButton,
    Notification,
} from "rsuite";

import TableCheckout from "../../components/tables/transactions/TableCheckout";
import { Cart, Page } from "../../store/Trans";
import { authenticated } from "../../store/User";


function Checkout() {

    const checkoutCart = useRecoilValue(Cart);
    const resetCart = useResetRecoilState(Cart);
    const setTransIndex = useSetRecoilState(Page);
    const auth = useRecoilValue(authenticated);

    const [isMember, setIsMember] = useState(false);
    const [name, setName] = useState('');
    const [cash, setCash] = useState(0);
    const [date, setDate] = useState(new Date());
    const [discount, setDiscount] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [note, setNote] = useState('');

    const customerDropdown = () => {
        if (customers.length === 0) {
            setTimeout(() => {
                axios.get('dropdown/customers')
                    .then(res => setCustomers(res.data))
            }, 1000);
        }
    }

    const totalPrice = () => {
        let total = 0;
        checkoutCart.map((val, index) => {
            total = total + parseInt(val["count"] * val["price"]);
            return 0;
        })
        return total;
    }

    const priceToPay = () => {
        return totalPrice() - discount;
    }

    const moneyChange = () => {
        let res = 0
        if (cash > 0) {
            res = parseInt(cash) - priceToPay();
        }
        return res;
    }

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    const request = {
        name, 
        isMember, 
        discount, 
        date: moment(date).format("YYYY-MM-DD"),
        cash,
        note, checkoutCart,
        cost: totalPrice(),
        user: auth.user.id
    };

    const recordSales = async () => {
        try {
            // console.log(request);
            let { data } = await axios.post('transactions/record-sales', request);
            resetCart();
            setTransIndex(0);
            Notification.success({
                title: "Success",
                description: data.message
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Grid fluid>
            <Row className="animate__animated animate__fadeIn">
                <Col xs={24} sm={24} md={17} className="px-0">
                    <div className="pb-1">
                        <IconButton
                            icon={<Icon icon="chevron-left" />}
                            appearance="default"
                            size="sm"
                            onClick={() => setTransIndex(1)}
                        >
                            <span className="t3 pl-1">Checkout</span>
                        </IconButton>
                    </div>
                    <div className="pb-2" style={{ paddingTop: 4 }}>
                        <TableCheckout />
                    </div>
                    <div className="pb-2" style={{ paddingTop: 4 }}>
                        <Panel className="is-bg-white p-0 bold">
                            <div className="flex jc-sb">
                                <span className="t3">Total Harga</span>
                                <span> {curr.format(totalPrice())} </span>
                            </div>
                        </Panel>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} className="px-0px">
                    <div className="pl-2">
                        <div className="pb-2">
                            <span className="t3 pr-1">Struk Pembayaran</span>
                            <span className="t4 pr-1">#2108023009</span>
                        </div>
                        <div style={{ paddingTop: 4 }}>
                            {" "}
                            <Panel className="is-bg-white" style={{ minHeight: "80vh" }}>
                                <Form fluid className="pt-2">
                                    <Row>
                                        <Col md={24}>
                                            <FormGroup>
                                                <ControlLabel>Tanggal Pembelian</ControlLabel>
                                                <DatePicker oneTap block
                                                    value={date}
                                                    cleanable={false}
                                                    ranges={[]}
                                                    size="sm"
                                                    placeholder="Tanggal"
                                                    placement="auto"
                                                    onChange={(value) => { setDate(value) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <div className="flex jc-sb">
                                            <ControlLabel>Nama</ControlLabel>
                                            <Toggle
                                                size="sm"
                                                checkedChildren={<Icon icon="people-group" />}
                                                unCheckedChildren={<Icon icon="people-group" />}
                                                onChange={(val) => setIsMember(val)}
                                            />
                                        </div>
                                        {
                                            isMember ?
                                                <SelectPicker
                                                    data={customers}
                                                    onOpen={customerDropdown}
                                                    size="sm"
                                                    placeholder="Member"
                                                    renderMenu={menu => {
                                                        if (customers.length === 0) {
                                                            return (
                                                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                                                    <Icon icon="spinner" spin /> Loading
                                                                </p>
                                                            );
                                                        }
                                                        return menu;
                                                    }}
                                                    onChange={val => setName(val)}
                                                    block
                                                />
                                                :
                                                <FormControl
                                                    size="sm"
                                                    placeholder="Non Member"
                                                    name="Nama"
                                                    onChange={val => setName(val)}
                                                />
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Diskon</ControlLabel>
                                        <InputGroup size="sm" style={{ width: '100%' }}>
                                            <InputGroup.Addon>Rp. </InputGroup.Addon>
                                            <NumberFormat
                                                placeholder='0'
                                                style={{ textAlign: 'right' }}
                                                className='rs-input'
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                onValueChange={(val) => { setDiscount(val.floatValue) }}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Jumlah Uang</ControlLabel>
                                        <InputGroup size="sm" style={{ width: '100%' }}>
                                            <InputGroup.Addon>Rp. </InputGroup.Addon>
                                            <NumberFormat
                                                placeholder='0'
                                                style={{ textAlign: 'right' }}
                                                className='rs-input'
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                onValueChange={(val) => { setCash(val.floatValue) }}
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
                                            onChange={val => setNote(val)}
                                        />
                                    </FormGroup>
                                    <Row>
                                        <Col md={12}>Total Bayar</Col>
                                        <Col md={12}>
                                            <div className="flex jc-sb bold">
                                                <span>Rp. </span>
                                                <span>
                                                    {curr.format(priceToPay()).slice(3)}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>Dibayar</Col>
                                        <Col md={12}>
                                            <div className="flex jc-sb bold">
                                                <span>Rp. </span>
                                                <span>
                                                    {curr.format(cash ?? 0).slice(3)}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>Kembali</Col>
                                        <Col md={12}>
                                            <div className="flex jc-sb bold">
                                                <span>Rp. </span>
                                                <span>
                                                    {curr.format(moneyChange() > 0 ? moneyChange() : 0).slice(3)}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>

                                <IconButton
                                    style={{ marginTop: "1.5rem" }}
                                    icon={<Icon icon="save" />}
                                    appearance="primary"
                                    color="green"
                                    onClick={() => recordSales()}
                                    block
                                >
                                    Simpan
                                </IconButton>
                            </Panel>
                        </div>
                    </div>
                </Col>
            </Row>
        </Grid>
    );
}

export default Checkout;
