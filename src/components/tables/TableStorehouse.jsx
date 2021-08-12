import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, Button, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../store/DataTable";
import { Storehouse } from "../../store/Trans";

const { Column, HeaderCell, Cell } = Table;


const TableStorehouse = (props) => {

    const [tableData, setTableData] = useState([]);
    const [storehouse, setStorehouse] = useRecoilState(Storehouse);

    const [data, setData] = useState([]);
    const [opname, setOpname] = useState([])
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = { length, search };


    const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
        const editing = rowData.status === 'EDIT';
        return (
            <Cell {...props} className={editing ? 'table-content-editing' : ''}>
                {editing ? (
                    <NumberFormat
                        autoFocus
                        className="rs-input"
                        style={{ textAlign: 'right' }}
                        // defaultValue={rowData[dataKey]}
                        value={rowData.newStock}
                        onChange={event => {
                            onChange && onChange(rowData.id, dataKey, event.target.value);
                        }}
                    />
                ) : (
                    <span className="table-content-edit-span">{rowData[dataKey]}</span>
                )}
            </Cell>
        );
    };

    const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {

        const itemOpname = async (itemData) => {

            const request = {
                id: itemData.id,
                code: itemData.code,
                newStock: itemData.newStock,
                updated: true
            }

            if (itemData.newStock !== '') {
                try {
                    let response = await axios.post('transactions/opname', request);
                    setOpname(response.data);
                    Notification.success({
                        title: "Success",
                        description: `Stock berhasil Diperbarui`
                    })
                } catch (error) {
                    Notification.error({
                        title: "Error",
                        description: "Oops!! Something Wrong"
                    })
                }
            }

        }

        return (
            <Cell {...props} >
                <ButtonToolbar>
                    <Button
                        color={rowData.status === 'EDIT' ? 'cyan' : rowData.updated ? 'green' : 'cyan'}
                        size="xs"
                        onClick={() => {
                            onClick && onClick(rowData.id);
                            if (!rowData.status) {
                                itemOpname(rowData)
                            }
                        }}
                    >
                        <Icon icon={rowData.status === 'EDIT' ? 'save' : rowData.updated ? 'check-square' : 'exchange'} />
                        <span className="is-tablet" style={{ marginLeft: "5px" }}>
                            {rowData.status === 'EDIT' ? ' Save' : rowData.updated ? 'updated' : 'update'}
                        </span>
                    </Button>
                </ButtonToolbar>
            </Cell>
        );
    };

    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        setLength(e);
        setPage(1);
    };

    const getData = useCallback(async (e) => {
        setSearch(props.search);
        setLoading(true);
        try {
            let tableItem = await axios.post(`table/commodities?page=${page}`, request);
            axios.get('transactions/opname-data')
                .then((response) => {
                    const dataOpname = (ind) => {
                        let index = response.data.find(op => op.id === ind.id)
                        return index || 0
                    }
                    setData(tableItem.data.data.map((item, index) => {
                        return Object.assign({}, item, {
                            key: index,
                            status: null,
                            newStock: dataOpname(item).newStock || 0,
                            updated: dataOpname(item).updated || false
                        })
                    }))
                    setTableData(tableItem.data);
                    props.info({ tableData: tableItem.data, opnameData: response.data });
                })
                .catch((response) => {
                    console.log(response);
                })
            setLoading(false);
        } catch (e) {
            setLoading(false);
            Notification.error({
                title: "Error",
                description: "nyapo kok gak kenek"
            })
            console.log(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, length, search, props.search, storehouse.updated])

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        //     if (storehouse.type === "opname" && opname.length > 0) {
        //         const nextData = Object.assign([], data);
        //         opname.map((val, index) => {
        //             nextData.find(item => item.id === val.id)["newStock"] = val.newStock;
        //             nextData.find(item => item.id === val.id)["updated"] = val.updated;
        //             return 0
        //         })
        //         setData(nextData);
        //     }
        props.info({ tableData: tableData, opnameData: opname })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opname, storehouse.type])

    // const handleChange = (id, key, value) => {
    //     const nextData = Object.assign([], data);
    //     const opnameData = Object.assign([], opname);
    //     const activeItem = opnameData.find(item => item.id === id);
    //     nextData.find(item => item.id === id)[key] = value;
    //     if (activeItem) {
    //         opnameData.find(item => item.id === id)[key] = value;
    //     } else {
    //         nextData.find(item => item.id === id)["updated"] = true;
    //     }
    //     setOpname(opnameData);
    //     setData(nextData);
    // };

    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], data);
        // const opnameData = Object.assign([], opname);
        // const activeItem = opnameData.find(item => item.id === id);
        nextData.find(item => item.id === id)[key] = value;
        // if (activeItem) {
        //     opnameData.find(item => item.id === id)[key] = value;
        // } else {
        //     nextData.find(item => item.id === id)["updated"] = true;
        // }
        // setOpname(opnameData);
        setData(nextData);
    };

    const handleEditState = id => {
        const nextData = Object.assign([], data);
        const activeItem = nextData.find(item => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';
        setData(nextData);
    };

    return (
        <div>
            <Table loading={loading} data={data} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.75}>
                    <HeaderCell>Kode Barang</HeaderCell>
                    <Cell dataKey="code" />
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.5} align="right">
                    <HeaderCell>Stok Lama</HeaderCell>
                    <Cell dataKey="stock" />
                </Column>
                {
                    storehouse.type === "opname" && (
                        <Column flexGrow={0.5} align="right">
                            <HeaderCell>Stok Baru</HeaderCell>
                            <EditCell dataKey="newStock" onChange={handleChange} />
                        </Column>
                    )
                }
                <Column flexGrow={1} align="center">
                    <HeaderCell>Action</HeaderCell>

                    {
                        storehouse.type === "opname" ? (
                            <ActionCell dataKey="id" onClick={handleEditState} />
                        ) : (
                            <Cell>
                                {
                                    (rowData) => {
                                        function handleRestock() {
                                            setStorehouse({ type: 'restock', data: rowData });
                                            console.log(rowData);
                                        };
                                        return (
                                            <ButtonToolbar>
                                                <Button
                                                    color="blue"
                                                    size="xs"
                                                    onClick={handleRestock}
                                                >
                                                    <Icon icon="cubes" />
                                                    <span className="is-tablet" style={{ marginLeft: "5px" }}>Restock</span>
                                                </Button>
                                            </ButtonToolbar>
                                        )
                                    }
                                }
                            </Cell>
                        )
                    }
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
        </div >
    );
};

export default TableStorehouse;
