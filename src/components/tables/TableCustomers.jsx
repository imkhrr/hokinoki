import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableCustomers = (props) => {
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
          <HeaderCell>Nama</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={0.8}>
          <HeaderCell>Alamat</HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column flexGrow={0.8}>
          <HeaderCell>No. HP</HeaderCell>
          <Cell dataKey="contact" />
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
                      icon={<Icon icon="edit" />}
                      appearance="ghost"
                      color="blue"
                      size="xs"
                      onClick={handleAction}
                    >
                      <span className="is-desktop">Edit</span>
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

export default TableCustomers;
