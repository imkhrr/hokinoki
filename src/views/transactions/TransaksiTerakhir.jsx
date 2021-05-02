import React, { Component } from "react";
import { Grid, Row, Col, Icon, Input, InputGroup, Button } from "rsuite";

import TableTransaksiTerakhir from "../../components/tables/transactions/TableTransaksiTerakhir";

class TransaksiTerakhir extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
    ];

    return (
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={24}>
            <div className="pb-2 flex jc-sb ai-c">
              <span className="t2 pr-1">Transaksi Terakhir</span>
              <div className="flex jc-sb">
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
            <div className="pb-2">
              <TableTransaksiTerakhir listdata={transData} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TransaksiTerakhir;
