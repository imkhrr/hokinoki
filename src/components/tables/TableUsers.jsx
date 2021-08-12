import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { usersTable } from "../../store/DataTable";
import { userModal } from "../../store/Modal";

const { Column, HeaderCell, Cell } = Table;

const TableUsers = (props) => {


    const [tableData, setTableData] = useRecoilState(usersTable);
    const [modal, setModal] = useRecoilState(userModal);

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
                            async function handleDelete() {
                                try {
                                    let { data } = await axios.delete(`/users/${rowData.id}`);
                                    Notification.success({
                                        title: 'Success',
                                        description: data.message
                                    })
                                } catch (e) {
                                    Notification.error({
                                        title: 'Error',
                                        description: 'Oopss, Something wrong!!'
                                    })
                                }
                                getData()
                            }

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
