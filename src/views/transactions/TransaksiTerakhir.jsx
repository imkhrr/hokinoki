import React, { Component } from "react";
import { Grid, Row, Col, Icon, Input, InputGroup } from "rsuite";

import TableTransaksiTerakhir from "../../components/tables/transactions/TableTransaksiTerakhir";

class TransaksiTerakhir extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const transData = [];

        return (
            <Grid fluid>
                <Row className="animate__animated animate__fadeIn">
                    <Col xs={24} sm={24} md={24} className="px-0px">
                        <div className="pb-2 flex jc-sb">
                            <span className="t3 pr-1">Transaksi Terakhir</span>
                            <div className="flex jc-sb ai-c">
                                <InputGroup size="xs">
                                    <Input placeholder="Search" />
                                    <InputGroup.Addon>
                                        <Icon icon="search" />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="pb-2" style={{ paddingTop: 3 }}>
                            <TableTransaksiTerakhir listdata={transData} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TransaksiTerakhir;
