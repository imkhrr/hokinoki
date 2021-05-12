import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";

const { Column, HeaderCell, Cell } = Table;

const TableTambahTransaksi = (props) => {
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

export default TableTambahTransaksi;
