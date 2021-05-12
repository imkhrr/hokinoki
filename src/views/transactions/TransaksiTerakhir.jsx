import React from "react";
import {
  Grid,
  Row,
  Col,
  Icon,
  Input,
  InputGroup,
  Button,
  IconButton,
} from "rsuite";

import TableTransaksiTerakhir from "../../components/tables/transactions/TableTransaksiTerakhir";

const transData = [
  {
    id: 1,
    list: "KD0978",
    buyer: "Angga",
    date: "08:46 24/04/2021",
    money: "+ 5.000",
  },
  {
    id: 2,
    list: "KO1278",
    buyer: "Pak Dimas",
    date: "12:25 23/04/2021",
    money: "+ 25.000",
  },
  {
    id: 3,
    list: "KT0978",
    buyer: "Diana",
    date: "09:12 22/04/2021",
    money: "+ 15.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
  {
    id: 4,
    list: "KT6574",
    buyer: "Putri",
    date: "15:32 21/04/2021",
    money: "+ 12.000",
  },
];

const TransaksiTerakhir = (props) => {
  return (
    <Grid fluid>
      <Row className="animate__animated animate__fadeIn animate__fast">
        <Col xs={24} sm={24} md={24} className="px-0px">
          <div className="pb-2 flex jc-sb">
            <span className="t3 pr-1">Transaksi Terakhir</span>
            <div className="flex jc-sb ai-c">
              <InputGroup size="xs">
                <Input placeholder="Keyword" />
                <InputGroup.Addon>
                  <Icon icon="search" />
                </InputGroup.Addon>
              </InputGroup>
              <div className="pl-2">
                <Button appearance="primary" size="xs">
                  Filter
                </Button>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 3 }}>
            <TableTransaksiTerakhir listdata={transData} />
          </div>
          <div className="flex jc-sb">
            <div></div>
            <IconButton
              icon={<Icon icon="plus" />}
              appearance="primary"
              style={{ width: 315 }}
              onClick={props.onNext}
            >
              Tambah Transaksi
            </IconButton>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default TransaksiTerakhir;
