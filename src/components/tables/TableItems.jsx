import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableItems = (props) => {
  return (
    <div>
      <Table data={props.listdata} autoHeight>
        <Column width={60} align="center">
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
        <Column flexGrow={0.8} align="left">
          <HeaderCell>Kategori</HeaderCell>
          <Cell dataKey="category" />
        </Column>
        <Column flexGrow={0.8} align="right">
          <HeaderCell>Harga</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column flexGrow={0.5} align="center">
          <HeaderCell>Stok</HeaderCell>
          <Cell dataKey="stock" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => {
              function handleAction() {
                alert(`id:${rowData.name}`);
              }
              return (
                <div>
                  <ButtonToolbar>
                    <IconButton
                      icon={<Icon icon="trash" />}
                      appearance="primary"
                      color="red"
                      size="xs"
                      onClick={handleAction}
                    >
                      Hapus
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

export default TableItems;
