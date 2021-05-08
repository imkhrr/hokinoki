import React, { Component } from "react";

import {
  Grid,
  Row,
  Col,
  Panel,
  Tag,
  Icon,
  IconButton,
  List,
  InputGroup,
  Input,
} from "rsuite";

import TableTambahTransaksi from "../../components/tables/transactions/TableTambahTransaksi";

class TambahTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
        subtotal: "18",
      },
    ];

    return (
      <Grid fluid>
        <Row className="animate__animated animate__fadeIn">
          <Col xs={24} sm={24} md={17} className="px-0px">
            <div className="pb-2 ">
              <span className="t3 pr-1">Tambah Transaksi</span>
            </div>
            <div className="pb-4" style={{ paddingTop: 4 }}>
              <TableTambahTransaksi listdata={addData} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} className="px-0px">
            <div className="pl-2">
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
              <Panel
                className="customscroll is-bg-white"
                style={{ height: "69vh", overflowY: "scroll" }}
              >
                <List style={{ boxShadow: "none" }} sortable>
                  {checkoutData.map((item, index) => (
                    <List.Item
                      // style={{ boxShadow: "none" }}
                      key={item["name"]}
                      index={index}
                    >
                      <div className="flex jc-sb">
                        <span className="bold">{item["name"]}</span>
                        <span>Rp. {item["subtotal"]}</span>
                      </div>
                      <br />
                      <div className="flex jc-sb">
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
              </Panel>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TambahTransaksi;
