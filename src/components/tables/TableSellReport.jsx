import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../store/DataTable";
import { itemModal } from "../../store/Modal";

const { Column, HeaderCell, Cell } = Table;

const TableSellReport = (props) => {

    const [tableData, setTableData] = useRecoilState(itemsTable);
    const [modal, setModal] = useRecoilState(itemModal);

    const [column, setColumn] = useState('id');
    const [sortType, setSortType] = useState('asc');
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = { sortType, column, length, search }

    const handleChangePage = (e) => {
        console.log(e);
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.log(e);
        setLength(e);
        setPage(1);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setColumn(sortColumn);
        setSortType(sortType);
        console.log(`Column : ${sortColumn}, 'Sort : ${sortType}`);
    }

    const getData = async (e) => {
        setSearch(props.search);
        setLoading(true);
        try {
            let { data } = await axios.post(`table/commodities?page=${page}`, request);
            setTableData(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.response);
        }
    }
    
    useEffect(() => {
        getData();
    }, [modal.eventSuccess, page, length, column, sortType, search, props.search]);


    return (
        <div>
            <Table loading={loading} data={tableData.data} height={400}>
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
                    <Cell></Cell>
                </Column>
                <Column flexGrow={0.75}>
                    <HeaderCell>Barang Terjual</HeaderCell>
                    <Cell></Cell>
                </Column>
                <Column flexGrow={0.75} align="left">
                    <HeaderCell>Jumlah Transakasi</HeaderCell>
                    <Cell></Cell>
                </Column>
                <Column flexGrow={1} align="right">
                    <HeaderCell>Total Pendapatan</HeaderCell>
                    <Cell dataKey="sell_price" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            async function handleDelete() {
                                try {
                                    let { data } = await axios.delete(`/commodities/${rowData.id}`);
                                    Notification.success({
                                        title: 'Berhasil',
                                        description: data.message
                                    })
                                } catch (e) {
                                    Notification.error({
                                        title: 'Gagal',
                                        description: 'Data tidak dapat dihapus'
                                    })
                                }
                                getData()
                            }

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
                                            appearance="ghost"
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
