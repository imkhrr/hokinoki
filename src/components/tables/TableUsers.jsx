import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { usersTable } from "../../store/DataTable";

const { Column, HeaderCell, Cell } = Table;

const TableUsers = (props) => {
  const [tableData, setTableData] = useRecoilState(usersTable);
  const [column, setColumn] = useState("id");
  const [sortType, setSortType] = useState("asc");
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const request = { sortType, column, length };

  const handleChangePage = (e) => {
    console.log(e);
    setPage(e);
  };

  const handleChangeLength = (e) => {
    console.log(e);
    setLength(e);
    setPage(1);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setColumn(sortColumn);
    setSortType(sortType);
    console.log(`Column : ${sortColumn}, 'Sort : ${sortType}`);
  };

  const getData = async (e) => {
    setLoading(true);
    try {
      let { data } = await axios.post(`table/users?page=${page}`, request);
      setTableData(data);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getData();
  }, [page, length, column, sortType]);

  return (
    <div>
      <Table loading={loading} data={tableData.data} height={400}>
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
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
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
      <TablePagination
        lengthMenu={[
          { value: 10, label: 10 },
          { value: 50, label: 50 },
          { value: 100, label: 100 },
          { value: 100, label: "all" },
        ]}
        total={tableData.total}
        activePage={tableData.current_page}
        displayLength={tableData.per_page}
        onChangePage={handleChangePage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

export default TableUsers;
