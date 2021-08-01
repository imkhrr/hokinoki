import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import { Cart } from "../../../store/Trans";

const { Column, HeaderCell, Cell } = Table;


const TableCheckout = (props) => {

    const [checkoutCart, setCheckoutCart] = useRecoilState(Cart);

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });
    
    return (
        <div>
            <Table data={checkoutCart} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={2}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.8} align="center">
                    <HeaderCell>Jumlah</HeaderCell>
                    <Cell dataKey="count">
                        {(rowData) => {
                            return <span className="bold ">{rowData.count}</span>;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8} align="right">
                    <HeaderCell>Harga</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return curr.format(rowData.price).slice(0, -3);
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8} align="right">
                    <HeaderCell>SubTotal</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return curr.format(rowData.count * rowData.price).slice(0, -3);
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.8}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {(rowData) => {
                            function handleAction() {
                                alert(`id: ${rowData.id}`);
                            }
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="trash" />}
                                            appearance="ghost"
                                            color="red"
                                            size="xs"
                                            onClick={handleAction}
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
        </div>
    );
};

export default TableCheckout;
