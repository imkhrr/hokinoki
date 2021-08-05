import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { transTable } from "../../../store/DataTable";

const { Column, HeaderCell, Cell } = Table;

const TableSellTransactions = (props) => {

    const [tableData, setTableData] = useRecoilState(transTable);
    // const [modal, setModal] = useRecoilState(transTable);
    const [column, setColumn] = useState('id');
    const [sortType, setSortType] = useState('asc');
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(true);
    const request = { sortType, column, length };

    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.clear();
        setLength(e);
        setPage(1);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setColumn(sortColumn);
        setSortType(sortType);
    }

    const getData = async () => {
        try {
            let { data } = await axios.post(`table/last-trans?page=?${page}`, request);
            setTableData(data);
        } catch (e) {
            
        }
    }

    useEffect(() => {
        getData();
    }, [page, length, column, sortType]);

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
                <Column flexGrow={1.5}>
                    <HeaderCell>Kode Transaksi</HeaderCell>
                    <Cell dataKey="code" />
                </Column>

                <Column flexGrow={0.8}>
                    <HeaderCell>Pembeli</HeaderCell>
                    <Cell dataKey="buyer" />
                </Column>
                <Column flexGrow={0.8} align="center">
                    <HeaderCell>Tanggal Transaksi</HeaderCell>
                    <Cell dataKey="date" />
                </Column>
                <Column flexGrow={1}>
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
                                            appearance="ghost"
                                            color="blue"
                                            size="xs"
                                            onClick={handleAction}
                                        >
                                            <span className="is-desktop">Rincian</span>
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
