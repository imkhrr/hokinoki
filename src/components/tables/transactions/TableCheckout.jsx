import React from "react";
import { useRecoilValue } from "recoil";
import { Table } from "rsuite";
import { Cart } from "../../../store/Trans";

const { Column, HeaderCell, Cell } = Table;


const TableCheckout = (props) => {

    const checkoutCart = useRecoilValue(Cart);

    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });
    
    return (
        <div>
            <Table data={checkoutCart} height={375}>
                <Column flexGrow={0.1} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.5}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.1} align="center">
                    <HeaderCell>Jumlah</HeaderCell>
                    <Cell dataKey="count">
                        {(rowData) => {
                            return <span className="bold ">{rowData.count}</span>;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.2} align="right">
                    <HeaderCell>Harga</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return curr.format(rowData.price).slice(0, -3);
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.2} align="right">
                    <HeaderCell>SubTotal</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return curr.format(rowData.count * rowData.price).slice(0, -3);
                        }}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
};

export default TableCheckout;
