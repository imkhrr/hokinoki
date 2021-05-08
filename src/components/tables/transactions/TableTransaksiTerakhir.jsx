import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableTransaksiTerakhir = (props) => {
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
          <HeaderCell>Kode Transaksi</HeaderCell>
          <Cell dataKey="list" />
        </Column>

        <Column flexGrow={0.8}>
          <HeaderCell>Pembeli</HeaderCell>
          <Cell dataKey="buyer" />
        </Column>
        <Column flexGrow={0.8} align="center">
          <HeaderCell>Tanggal Transaksi</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column flexGrow={1}>
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
                      icon={<Icon icon="info" />}
                      appearance="ghost"
                      color="blue"
                      size="xs"
                      onClick={handleAction}
                    >
                      <span className="is-desktop">Rincian</span>
                    </IconButton>
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

export default TableTransaksiTerakhir;
