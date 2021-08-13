import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { customersTable } from "../../store/DataTable";
import { customerModal } from "../../store/Modal";
import ConfirmationModal from "../modals/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const TableCustomers = (props) => {

    const [tableData, setTableData] = useRecoilState(customersTable);
    // const [tableData, setTableData] = useRecoilState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [modal, setModal] = useRecoilState(customerModal);
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const request = { length };


    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.clear();
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
            let { data } = await axios.delete(`/customers/${modalData.id}`);
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
        setLoading(true);
        try {
            let { data } = await axios.post(`table/customers?page=${page}`, request);
            setTableData(data);
            setLoading(false);
        } catch (e) {
            console.log(e.response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.eventSuccess, length, page])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>
            <ConfirmationModal
                show={showModal}
                header="Hapus Data Pelanggan"
                onClose={(e) => setShowModal(e)}
                save={deleteData}
            >
                <Table height={100} data={[modalData]} affixHorizontalScrollbar>
                    <Column width={40}>
                        <HeaderCell>ID </HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Nama </HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={500}>
                        <HeaderCell>Alamat </HeaderCell>
                        <Cell dataKey="address" />
                    </Column>
                </Table>
            </ConfirmationModal>

            <Table
                loading={loading}
                data={tableData.data}
                height={400}
            >
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            let num = length * (tableData.current_page - 1);
                            return num + rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Alamat</HeaderCell>
                    <Cell dataKey="address" />
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>No. HP</HeaderCell>
                    <Cell dataKey="contact_1" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {

                            function handleUpdate() {
                                setModal({
                                    ...modal,
                                    title: 'Edit data Pelanggan',
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

export default TableCustomers;
