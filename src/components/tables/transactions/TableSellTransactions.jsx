import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { transTable } from "../../../store/DataTable";

const { Column, HeaderCell, Cell } = Table;

const TableSellTransactions = (props) => {

    const [tableData, setTableData] = useRecoilState(transTable);
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const request = { length };

    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.clear();
        setLength(e);
        setPage(1);
    };

    const getData = useCallback( async () => {
        try {
            let { data } = await axios.post(`table/last-trans?page=?${page}`, request);
            setTableData(data);
        } catch (e) {
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, length])

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div>
            <Table data={tableData.data} height={375}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.7}>
                    <HeaderCell>Kode Transaksi</HeaderCell>
                    <Cell dataKey="transaction_code" />
                </Column>
                <Column flexGrow={1.3}>
                    <HeaderCell>Pembeli</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                return rowData.customer != null ? rowData.customer.name : rowData.non_customer
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={0.7}>
                    <HeaderCell>Kasir</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                return rowData.transaction.user.name
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={0.8} align="center">
                    <HeaderCell>Tanggal Transaksi</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                return rowData.transaction.date
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {(rowData) => {
                            function handleAction() {
                                alert(`id: ${rowData.id}`);
                            }
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="info" />}
                                            // appearance="ghost"
                                            color="blue"
                                            size="xs"
                                            onClick={handleAction}
                                        >
                                            <span className="is-desktop">Rincian</span>
                                        </IconButton>
                                        <IconButton
                                            icon={<Icon icon="trash" />}
                                            // appearance="ghost"
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
            <TablePagination
                lengthMenu={[
                    { value: 10, label: 10 },
                    { value: 50, label: 50 },
                    { value: 100, label: 100 },
                ]}
                total={tableData.total}
                activePage={tableData.current_page}
                displayLength={tableData.per_page}
                onChangePage={handleChangePage}
                onChangeLength={handleChangeLength}
            />
        </div>
    );
};

export default TableSellTransactions;
