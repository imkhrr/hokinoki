import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import Currency from "../../helper/Currency";
import ConfirmationModal from "../modals/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const TableItems = (props) => {

    // MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
        
    // TABLE STATE
    const [tableData, setTableData] = useState({});
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = { length, search };

    // TABLE PROCESSING
    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        setLength(e);
        setPage(1);
    };

    const handleDelete = useCallback( (data) => {
        setShowModal(true);
        setModalData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalData, showModal])

    const handleUpdate = useCallback( (data) => {
        props.onEdit(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // DATA PROCESSING
    const deleteData = async (e) => {
        try {
            await axios.delete(`/commodities/${modalData.id}`);
            Notification.success({
                title: 'Berhasil',
                description: "Data Barang Berhasil Dihapus"
            })
            getData();
        } catch (error) {
            Notification.error({
                title: 'Gagal',
                description: 'Data tidak dapat dihapus'
            })
        }
        setShowModal(false);
        setTimeout(() => setModalData([]), 300);
    }

    const getData = useCallback(async (e) => {
        setLoading(true);
        try {
            let { data } = await axios.post(`table/commodities?page=${page}`, request);
            setTableData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Gagal Memuat Data Barang");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, length, search])

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        if (props.reload) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reload])

    useEffect(() => {
        setSearch(props.search);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.search])

    return (
        <div>
            <Table loading={loading} data={tableData.data} height={400} affixHorizontalScrollbar>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            let num = length * (tableData.current_page - 1);
                            return num + rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column width={100}>
                    <HeaderCell>Kode Barang</HeaderCell>
                    <Cell dataKey="code" />
                </Column>
                <Column flexGrow={1.5} minWidth={200}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={125} align="left">
                    <HeaderCell>Kategori</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            if (rowData.commodity_type.name) {
                                return rowData.commodity_type.name;
                            }
                        }}
                    </Cell>
                </Column>
                <Column width={75} align="left">
                    <HeaderCell>Unit</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            if (rowData.commodity_unit.name) {
                                return rowData.commodity_unit.name;
                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.5} minWidth={125} align="center">
                    <HeaderCell>Harga</HeaderCell>
                    <Cell>
                        {
                            (rowData) => {
                                return (
                                    <div className="flex jc-sb bold">
                                        <span > Rp. </span>
                                        <span> {Currency(rowData.sell_price, [3])} </span>
                                    </div>
                                )
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={0.75} minWidth={100} align="center" fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="edit" />}
                                            appearance="primary"
                                            color="blue"
                                            size="xs"
                                            onClick={() => handleUpdate(rowData)}
                                        >
                                            <span className="is-desktop">Edit</span>
                                        </IconButton>
                                        <IconButton
                                            icon={<Icon icon="trash" />}
                                            appearance="primary"
                                            color="red"
                                            size="xs"
                                            onClick={() => handleDelete(rowData)}
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

            <ConfirmationModal
                show={showModal}
                header="Hapus Data Barang"
                onClose={(e) => setShowModal(e)}
                save={deleteData}
            >
                <Table height={100} data={[modalData]} affixHorizontalScrollbar>
                    <Column width={50}>
                        <HeaderCell>ID </HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={100}>
                        <HeaderCell>Kode Barang </HeaderCell>
                        <Cell dataKey="code" />
                    </Column>
                    <Column flexGrow={1.5} minWidth={200}>
                        <HeaderCell>Nama Barang </HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                </Table>
            </ConfirmationModal>
        </div>
    );
};

export default TableItems;
