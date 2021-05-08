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

class BarCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const data = [
      {
        name: "Senin",
        terjual: "45",
        transaksi: "15",
      },
      {
        name: "Selasa",
        terjual: "25",
        transaksi: "13",
      },
      {
        name: "Rabu",
        terjual: "22",
        transaksi: "14",
      },
      {
        name: "Kamis",
        terjual: "60",
        transaksi: "17",
      },
      {
        name: "Jumat",
        terjual: "33",
        transaksi: "24",
      },
      {
        name: "Sabtu",
        terjual: "42",
        transaksi: "11",
      },
      {
        name: "Minggu",
        terjual: "29",
        transaksi: "20",
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
        <Bar dataKey="transaksi" fill="#9c27b0" />
      </BarChart>
    );
  }
}

export default BarCharts;
