import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";

const { Column, HeaderCell, Cell } = Table;

const TableCheckout = (props) => {
  return (
    <div>
      <Table data={props.listdata} height={400}>
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
          <Cell dataKey="price" />
        </Column>
        <Column flexGrow={0.8} align="right">
          <HeaderCell>SubTotal</HeaderCell>
          <Cell dataKey="subtotal" />
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

      <TablePagination
        lengthMenu={[
          { value: 10, label: 10 },
          { value: 50, label: 50 },
          { value: 100, label: 100 },
          { value: 100, label: "all" },
        ]}
      />
    </div>
  );
};

export default TableCheckout;
