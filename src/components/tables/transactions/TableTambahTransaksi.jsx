import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../../store/DataTable";
import { Cart } from "../../../store/Trans";

const { Column, HeaderCell, Cell } = Table;

const TableTambahTransaksi = (props) => {

    const [tableData, setTableData] = useRecoilState(itemsTable);
    const [shopCart, setShopCart] = useRecoilState(Cart);
    
    // const checkoutCart = useSetRecoilState(Cart);
    // const [shopCart, setShopCart] = useState([]);

    // useEffect(() => {
    //     checkoutCart(shopCart);
    //     console.log(shopCart);
    // }, [shopCart])

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });


    const [column, setColumn] = useState('id');
    const [sortType, setSortType] = useState('asc');
    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const request = { sortType, column, length }


    const getData = async (e) => {
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
    }, [page, length, column, sortType]);

    return (
        <div>
            <Table data={tableData.data} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
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
                            return <span className="bold ">{rowData.stock}</span>;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            function handleAction() {
                                let itemData = {
                                    id: rowData.id,
                                    name: rowData.name,
                                    category: rowData.commodity_type.name,
                                    count: 1,
                                    sellPrice: rowData.sell_price,
                                    price: rowData.sell_price
                                }

                                let index = shopCart.findIndex(obj => obj.id === rowData.id);

                                if (index < 0) {
                                    setShopCart([...shopCart, itemData])
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
                                        icon={<Icon icon="plus" />}
                                        appearance="ghost"
                                        color="blue"
                                        size="xs"
                                        onClick={handleAction}
                                    >
                                        <span className="is-desktop">Tambah</span>
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
                ]}
                total={100}
                activePage={1}

            />
        </div>
    );
};

export default TableTambahTransaksi;
