import React, { Component } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

class DashboardChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const data = [
            {
                name: "Senin",
                terjual: "45",
                transaksi: "18",
            },
            {
                name: "Selasa",
                terjual: "25",
                transaksi: "10",
            },
            {
                name: "Rabu",
                terjual: "22",
                transaksi: "12",
            },
            {
                name: "Kamis",
                terjual: "60",
                transaksi: "29",
            },
            {
                name: "Jumat",
                terjual: "33",
                transaksi: "10",
            },
            {
                name: "Sabtu",
                terjual: "42",
                transaksi: "22",
            },
            {
                name: "Minggu",
                terjual: "29",
                transaksi: "35",
            },
        ];
        return (
            <ResponsiveContainer width="100%" height={227}>
                <BarChart
                    data={data}
                    margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="terjual" fill="#f44336" />
                    <Bar dataKey="transaksi" fill="#9c27b0" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default DashboardChart;
