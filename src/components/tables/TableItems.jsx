import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../store/DataTable";
import { itemModal } from "../../store/Modal";

const { Column, HeaderCell, Cell } = Table;

const TableItems = (props) => {

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
                <Column flexGrow={0.5}>
                    <HeaderCell>Kode Barang</HeaderCell>
                    <Cell dataKey="code" />
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
                <Column flexGrow={1} align="center">
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
                                            // appearance="ghost"
                                            color="blue"
                                            size="xs"
                                            onClick={handleUpdate}
                                        >
                                            <span className="is-desktop">Edit</span>
                                        </IconButton>
                                        <IconButton
                                            icon={<Icon icon="trash" />}
                                            // appearance="ghost"
                                            color="red"
                                            size="xs"
                                            onClick={handleDelete}
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

export default TableItems;
