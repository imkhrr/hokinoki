import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableTransaksiTerakhir = (props) => {
  return (
    <div>
      <Table data={props.listdata} autoHeight>
        <Column width={60} align="center" fixed>
          <HeaderCell>No.</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              return rowIndex + 1;
            }}
          </Cell>
        </Column>
        <Column flexGrow={1.5} sortable>
          <HeaderCell>Kode Transaksi</HeaderCell>
          <Cell dataKey="list" />
        </Column>

        <Column flexGrow={0.8} sortable>
          <HeaderCell>Pembeli</HeaderCell>
          <Cell dataKey="buyer" />
        </Column>
        <Column flexGrow={0.8} align="center" sortable>
          <HeaderCell>Waktu Pembelian</HeaderCell>
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
                      appearance="primary"
                      color="blue"
                      size="xs"
                      onClick={handleAction}
                    >
                      Rincian
                    </IconButton>
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

export default TableTransaksiTerakhir;
