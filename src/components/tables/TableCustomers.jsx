import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton, Notification } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { customersTable } from "../../store/DataTable";
import { customerModal } from "../../store/Modal";

const { Column, HeaderCell, Cell } = Table;

const TableCustomers = (props) => {
  const [tableData, setTableData] = useRecoilState(customersTable);
  const [modal, setModal] = useRecoilState(customerModal);
  const [column, setColumn] = useState("id");
  const [sortType, setSortType] = useState("asc");
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const request = { sortType, column, length };

  const handleChangePage = (e) => {
    setPage(e);
  };

  const handleChangeLength = (e) => {
    console.clear();
    setLength(e);
    setPage(1);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setColumn(sortColumn);
    setSortType(sortType);
  };

  const getData = async (e) => {
    setLoading(true);
    try {
      let { data } = await axios.post(`table/customers?page=${page}`, request);
      setTableData(data);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getData();
  }, [modal.eventSuccess, page, length, column, sortType]);

  return (
    <div>
      <Table loading={loading} data={tableData.data} height={400}>
        <Column width={50} align="center" fixed>
          <HeaderCell>No.</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              let num = length * (tableData.current_page - 1);
              return num + rowIndex + 1;
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
          <Cell dataKey="contact_1" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => {
              async function handleDelete() {
                try {
                  let { data } = await axios.delete(`/customers/${rowData.id}`);
                  Notification.success({
                    title: "Berhasil",
                    description: data.message,
                  });
                } catch (e) {
                  Notification.error({
                    title: "Gagal",
                    description: "Data tidak dapat dihapus",
                  });
                }
                getData();
              }

              function handleUpdate() {
                setModal({
                  ...modal,
                  title: "Edit data Pelanggan",
                  size: "xs",
                  show: true,
                  formData: rowData,
                  update: true,
                });
              }
              return (
                <div>
                  <ButtonToolbar>
                    <IconButton
                      icon={<Icon icon="edit" />}
                      appearance="ghost"
                      color="blue"
                      size="xs"
                      onClick={handleUpdate}
                    >
                      <span className="is-desktop">Edit</span>
                    </IconButton>
                    <IconButton
                      icon={<Icon icon="trash" />}
                      appearance="ghost"
                      color="red"
                      size="xs"
                      onClick={handleDelete}
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

export default TableCustomers;
