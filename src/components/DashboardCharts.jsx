import React, { Component } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

class DashboardCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const data = [
      {
        name: "Senin",
        terjual: "45",
        pelanggan: "15",
        transaksi: "18",
        stok_opname: "12",
      },
      {
        name: "Selasa",
        terjual: "25",
        pelanggan: "13",
        transaksi: "10",
        stok_opname: "15",
      },
      {
        name: "Rabu",
        terjual: "22",
        pelanggan: "14",
        transaksi: "12",
        stok_opname: "2",
      },
      {
        name: "Kamis",
        terjual: "60",
        pelanggan: "17",
        transaksi: "29",
        stok_opname: "21",
      },
      {
        name: "Jumat",
        terjual: "33",
        pelanggan: "24",
        transaksi: "10",
        stok_opname: "11",
      },
      {
        name: "Sabtu",
        terjual: "42",
        pelanggan: "11",
        transaksi: "22",
        stok_opname: "19",
      },
      {
        name: "Minggu",
        terjual: "29",
        pelanggan: "20",
        transaksi: "35",
        stok_opname: "8",
      },
    ];
    return (
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        width={750}
        height={260}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="terjual" fill="#f44336" />
        <Bar dataKey="pelanggan" fill="#e91e63" />
        <Bar dataKey="transaksi" fill="#9c27b0" />
        <Bar dataKey="stok_opname" fill="#3f51b5" />
      </BarChart>
    );
  }
}

export default DashboardCharts;
