import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../store/DataTable";
import { itemModal } from "../../store/Modal";
import Currency from "../../helper/Currency";
import ConfirmationModal from "../modals/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const TableItems = (props) => {

    const [tableData, setTableData] = useRecoilState(itemsTable);
    const [modal, setModal] = useRecoilState(itemModal);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = {length, search};

    const handleChangePage = (e) => {
        console.log(e);
        setPage(e);
    };

    const handleChangeLength = (e) => {
        setLength(e);
        setPage(1);
    };

    const handleDelete = useCallback(async (data) => {
        setShowModal(true);
        setModalData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalData, showModal])

    const deleteData = async (e) => {
        try {
            let { data } = await axios.delete(`/commodities/${modalData.id}`);
            Notification.success({
                title: 'Berhasil',
                description: data.message
            })
            getData()
            setShowModal(false);
            setModalData([]);
        } catch (e) {
            Notification.error({
                title: 'Gagal',
                description: 'Data tidak dapat dihapus'
            })
            setShowModal(false);
            setModalData([]);
        }
    }

    const getData = useCallback(async (e) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.eventSuccess, page, length, search, props.search])

    useEffect(() => {
       getData() 
    }, [getData])

    return (
        <div>
            <ConfirmationModal
                show={showModal}
                header="Hapus Data Barang"
                onClose={(e) => setShowModal(e)}
                save={deleteData}
            >
                <Table height={100} data={[modalData]} affixHorizontalScrollbar>
                    <Column width={40}>
                        <HeaderCell>ID </HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>Kode Barang </HeaderCell>
                        <Cell dataKey="code" />
                    </Column>
                    <Column width={500}>
                        <HeaderCell>Nama Barang </HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                </Table>
            </ConfirmationModal>

            <Table loading={loading} data={tableData.data} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            let num = length * (tableData.current_page - 1);
                            return num + rowIndex + 1;
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
                    <Cell>
                        {
                            (rowData) => {
                                return (
                                    <div className="flex jc-sb bold">
                                        <span>
                                            Rp. 
                                        </span>
                                        <span>
                                            {Currency(rowData.sell_price, [3])}
                                        </span>
                                    </div>
                                )
                            }
                        }
                    </Cell>
                </Column>
                <Column flexGrow={1} align="center">
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
                                            appearance="primary"
                                            color="blue"
                                            size="xs"
                                            onClick={handleUpdate}
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
        </div>
    );
};

export default TableItems;
