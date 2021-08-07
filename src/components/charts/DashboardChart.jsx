import axios from "axios";
import moment from "moment";
import React, { Component, useEffect, useState } from "react";
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

function DashboardChart() {

    const [data, setData] = useState([])
    const date = new Date();
    const date_now = moment(date);

    useEffect(() => {
        axios.get('dashboard/graph')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    useEffect(() => {
        if (data.length > 0) {
            console.log(data[0].date);
        }
    }, [data])

    return (
        <ResponsiveContainer width="100%" height={227}>
            <BarChart
                data={data}
                margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Terjual" fill="#f44336" />
                <Bar dataKey="Transaksi" fill="#9c27b0" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DashboardChart;
