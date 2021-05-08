import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";

const { Column, HeaderCell, Cell } = Table;

const TableItems = (props) => {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async (e) => {
        setLoading(true);
        try {
            let { data } = await axios.get('commodities');
            setTableData(data);
            setLoading(false);
        } catch (e) {
            console.log(e.response);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Table loading={ loading } data={ tableData } autoHeight>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.8} align="left">
                    <HeaderCell>Kategori</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            if (rowData.commodity_type.name) {
                                return rowData.commodity_type.name;
                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.5} align="left">
                    <HeaderCell>Unit</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            if (rowData.commodity_unit.name) {
                                return rowData.commodity_unit.name;
                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.5} align="right">
                    <HeaderCell>Harga</HeaderCell>
                    <Cell dataKey="sell_price" />
                </Column>
                <Column flexGrow={0.5} align="center">
                    <HeaderCell>Stok</HeaderCell>
                    <Cell dataKey="stock" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            function handleAction() {
                                alert(`id:${rowData.name}`);
                            }
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="edit" />}
                                            appearance="ghost"
                                            color="blue"
                                            size="xs"
                                            onClick={handleAction}
                                        >
                                            <span className="is-desktop">Edit</span>
                                        </IconButton>
                                        <IconButton
                                            icon={<Icon icon="trash" />}
                                            appearance="ghost"
                                            color="red"
                                            size="xs"
                                            onClick={handleAction}
                                        >
                                            <span className="is-desktop">Hapus</span>
                                        </IconButton>
                                    </ButtonToolbar>
                                </div>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
            <TablePagination />
        </div>
    );
};

export default TableItems;
