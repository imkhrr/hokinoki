import React from "react";
import { ButtonToolbar, Table, Icon, IconButton, Tag } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableTambahTransaksi = (props) => {
  return (
    <div>
      <Table data={props.listdata} autoHeight>
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
          <Cell dataKey="category" />
        </Column>
        <Column flexGrow={0.8} align="right">
          <HeaderCell>Harga</HeaderCell>
          <Cell dataKey="price" />
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
                alert(`id: ${rowData.id}`);
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
    </div>
  );
};

export default TableTambahTransaksi;
