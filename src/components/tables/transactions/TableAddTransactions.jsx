import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../../store/DataTable";
import { Cart } from "../../../store/Trans";

const { Column, HeaderCell, Cell } = Table;

const TableAddTransactions = (props) => {

    const [tableData, setTableData] = useRecoilState(itemsTable);
    const [shopCart, setShopCart] = useRecoilState(Cart);


    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const request = { length, search }

    const handleChangePage = (e) => {
        setPage(e);
    };

    const handleChangeLength = (e) => {
        setLength(e);
        setPage(1);
    };

    const getData = useCallback(async (e) => {
        setSearch(props.search);
        if (search.length > 0) {
            setPage(1);
        }
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
    }, [page, length, search, props.search])

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div>
            <Table data={tableData.data} loading={loading} height={375}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Kode Barang</HeaderCell>
                    <Cell dataKey="code" />
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Kategori</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            if (rowData.commodity_type.name) {
                                return rowData.commodity_type.name;
                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8} align="right">
                    <HeaderCell>Harga</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return curr.format(rowData.sell_price).slice(0, -3);
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8} align="center">
                    <HeaderCell>Stok</HeaderCell>
                    <Cell dataKey="stock">
                        {(rowData) => {

                            let stock = rowData.stock;
                            let warning = !stock && 'is-red'

                            let index = shopCart.findIndex(obj => obj.id === rowData.id);

                            if (index > -1) {
                                stock = rowData.stock - shopCart[index].count;
                                if (stock <= 0) {
                                    warning = 'is-red';
                                }
                            }
                            return (
                                <span className={`bold ${warning}`}>
                                    {stock}
                                </span>
                            )
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {

                            let stock = rowData.stock;
                            let disable = stock ? false : true;

                            let index = shopCart.findIndex(obj => obj.id === rowData.id);

                            if (index > -1) {
                                stock = rowData.stock - shopCart[index].count;
                                if (stock <= 0) {
                                    disable = true;
                                }
                            }

                            function handleAction() {

                                let itemData = {
                                    id: rowData.id,
                                    name: rowData.name,
                                    category: rowData.commodity_type.name,
                                    count: 1,
                                    sellPrice: rowData.sell_price,
                                    price: rowData.sell_price,
                                    limit: rowData.stock
                                }

                                if (index < 0) {
                                    setShopCart([...shopCart, itemData]);
                                } else {
                                    let _shopCart = [...shopCart];
                                    _shopCart[index] = {
                                        ..._shopCart[index],
                                        count: _shopCart[index].count + 1
                                    };
                                    setShopCart(_shopCart);
                                }


                            }
                            return (
                                <ButtonToolbar>
                                    <IconButton
                                        icon={<Icon icon={disable ? 'warning' : 'plus'} />}
                                        appearance={disable ? 'ghost' : 'primary'}
                                        color="blue"
                                        size="xs"
                                        onClick={handleAction}
                                        disabled={disable}
                                    >
                                        <span className="is-desktop">{disable ? 'Habis' : 'Tambah'}</span>
                                    </IconButton>
                                </ButtonToolbar>
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

export default TableAddTransactions;
