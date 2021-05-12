import React from "react";
import {
  Grid,
  Row,
  Col,
  Tag,
  Icon,
  IconButton,
  List,
  InputGroup,
  Input,
} from "rsuite";

import TableTambahTransaksi from "../../components/tables/transactions/TableTambahTransaksi";

const addData = [
  {
    id: 1,
    name: "Nanas",
    category: "Buah",
    stock: 15,
    price: "5.000",
  },
  {
    id: 2,
    name: "Anggur Merah",
    category: "Minuman",
    stock: 99,
    price: "75.000",
  },
  {
    name: "Tahu Kuning",
    category: "Makanan",
    stock: 5,
    price: "10.000",
  },
  {
    name: "Tomat Merah",
    category: "Sayur",
    stock: 4,
    price: "6.000",
  },
  {
    name: "Jagung Manis",
    category: "Sayur",
    stock: 8,
    price: "16.000",
  },
];

const checkoutData = [
  {
    name: "Nanas",
    category: "Buah",
    count: 5,
    subtotal: "5.000",
  },
  {
    name: "Anggur Merah",
    category: "Minuman",
    count: 2,
    subtotal: "150.000",
  },
  {
    name: "Tahu Kuning",
    category: "Makanan",
    count: 5,
    subtotal: "10.000",
  },
  {
    name: "Tomat Merah",
    category: "Sayur",
    count: 4,
    subtotal: "6.000",
  },
  {
    name: "Jagung Manis",
    category: "Sayur",
    count: 8,
    subtotal: "18.000",
  },
];

const TambahTransaksi = (props) => {
  return (
    <div>
      <Grid fluid>
        <Row className="animate__animated animate__fadeIn animate__fast">
          <Col xs={24} sm={24} md={17} className="pl-0px">
            <div className="pb-2 ">
              <span className="t3 pr-1">Tambah Transaksi</span>
            </div>
            <div style={{ paddingTop: 4 }}>
              <TableTambahTransaksi listdata={addData} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} className="pr-0px pb-3">
            <div>
              <div className="pb-2 flex jc-sb">
                <div>
                  <span className="t3 pr-1">Keranjang</span>

                  <Tag color="blue">7</Tag>
                </div>

                <IconButton
                  size="xs"
                  appearance="ghost"
                  icon={<Icon icon="check" />}
                >
                  Clear All
                </IconButton>
              </div>
              <div
                className="customscroll"
                style={{ height: 400, overflowY: "scroll" }}
              >
                <List style={{ boxShadow: "none", borderRadius: "8px" }}>
                  {checkoutData.map((item, index) => (
                    <List.Item
                      key={item["name"]}
                      index={index}
                      className="px-3 mb-1"
                    >
                      <div className="flex jc-sb">
                        <div>
                          <span className="bold">{item["name"]}</span>
                          <p>Buah</p>
                        </div>

                        <span>Rp. {item["subtotal"]}</span>
                      </div>
                      <br />
                      <div className="flex jc-sb">
                        <span>Jumlah</span>
                        <InputGroup style={{ width: 80 }}>
                          <InputGroup.Button size="xs">-</InputGroup.Button>
                          <Input
                            value={item["count"]}
                            size="xs"
                            max={99}
                            min={1}
                          />
                          <InputGroup.Button size="xs">+</InputGroup.Button>
                        </InputGroup>
                        <IconButton
                          appearance="ghost"
                          color="red"
                          size="xs"
                          icon={<Icon icon="trash" />}
                        >
                          Hapus
                        </IconButton>
                      </div>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
      <div className="flex jc-sb">
        <IconButton
          icon={<Icon icon="chevron-left" />}
          appearance="default"
          onClick={props.onBack}
        >
          Back
        </IconButton>
        <IconButton
          icon={<Icon icon="shopping-cart" />}
          appearance="primary"
          style={{ width: 315 }}
          onClick={props.onNext}
        >
          Checkout
        </IconButton>
      </div>
    </div>
  );
};

export default TambahTransaksi;
