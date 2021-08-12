import axios from "axios";
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { sellReportTable } from "../../store/DataTable";
import { itemModal } from "../../store/Modal";

const { Column, HeaderCell, Cell } = Table;

const TableSellReport = (props) => {

    const [tableData, setTableData] = useRecoilState(sellReportTable);
    const [modal, setModal] = useRecoilState(itemModal);

    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = { length, search }

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    const handleChangePage = (e) => {
        console.log(e);
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.log(e);
        setLength(e);
        setPage(1);
    };

    const getData = useCallback(async (e) => {
        setSearch(props.search);
        setLoading(true);
        try {
            let { data } = await axios.post(`transactions/report?page=${page}`, request);
            setTableData(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.eventSuccess, page, length, search, props.search])

    useEffect(() => {
        getData();
    }, [getData]);


    return (
        <div>
            <Table loading={loading} data={tableData.data} height={400} >
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Tanggal Laporan</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                const dateReport = moment(rowData.date).locale('id')
                                return dateReport.format("dddd, DD MMMM YYYY")
                            }
                        }
                    </Cell>

                </Column>
                <Column flexGrow={0.5} align="right">
                    <HeaderCell>Barang Terjual</HeaderCell>
                    <Cell dataKey="items_sold" />
                </Column>
                <Column flexGrow={0.5} align="right">
                    <HeaderCell>Jumlah Transakasi</HeaderCell>
                    <Cell dataKey="total_transaction" />

                </Column>
                <Column flexGrow={0.7} align="right">
                    <HeaderCell>Total Pendapatan</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                return (
                                    <div className="flex jc-sb bold">
                                        <span className="ml-5">Rp. </span>
                                        <span>{curr.format(rowData.income).slice(3)}</span>
                                    </div>
                                )
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={0.5} align="center">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            function handleUpdate() {
                                setModal({
                                    ...modal,
                                    title: 'Edit data Barang',
                                    size: 'xs',
                                    show: true,
                                    formData: rowData,
                                    update: true
                                })
                            }
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="edit" />}
                                            // appearance="ghost"
                                            color="blue"
                                            size="xs"
                                            onClick={handleUpdate}
                                        >
                                            <span className="is-desktop">Lihat Detail</span>
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
                    { value: tableData.total, label: "all" },
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

export default TableSellReport;
