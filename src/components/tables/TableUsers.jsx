import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { usersTable } from "../../store/DataTable";
import { userModal } from "../../store/Modal";
import ConfirmationModal from "../modals/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const TableUsers = (props) => {


    const [tableData, setTableData] = useRecoilState(usersTable);
    const [modal, setModal] = useRecoilState(userModal);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleChangePage = (e) => {
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
            let { data } = await axios.delete(`/users/${modalData.id}`);
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
            let { data } = await axios.post(`table/users?page=${page}`, length);
            setTableData(data);
            setLoading(false);
        } catch (e) {
            console.log(e.response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, length, modal.eventSuccess])

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div>
            <ConfirmationModal
                show={showModal}
                header="Hapus Data Pengguna"
                onClose={(e) => setShowModal(e)}
                save={deleteData}
            >
                <Table height={100} data={[modalData]} affixHorizontalScrollbar>
                    <Column width={40}>
                        <HeaderCell>ID </HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={100}>
                        <HeaderCell>Username </HeaderCell>
                        <Cell dataKey="username" />
                    </Column>
                    <Column width={300}>
                        <HeaderCell>Nama </HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                </Table>
            </ConfirmationModal>

            <Table loading={loading} data={tableData.data} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Username</HeaderCell>
                    <Cell dataKey="username" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            function handleUpdate() {
                                setModal({
                                    ...modal,
                                    title: 'Edit data Pengguna',
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
                    { value: 100, label: "all" },
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

export default TableUsers;
