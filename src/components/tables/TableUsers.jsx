import React from "react";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const TableUsers = (props) => {
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
          <HeaderCell>Nama</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={0.8}>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column flexGrow={0.8}>
          <HeaderCell>Alamat</HeaderCell>
          <Cell dataKey="address" />
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
                      appearance="primary"
                      color="blue"
                      size="xs"
                      onClick={handleAction}
                    >
                      Edit
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

export default TableUsers;
