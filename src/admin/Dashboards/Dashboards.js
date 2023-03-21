import { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
  
    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}order/getStatic/2023`);
            const data = await response.json();
            setData(data);
        };
        fetchSearchResults();
    }, []);
    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}users/getStatic/2023`);
            const data = await response.json();
            setData1(data);
        };
        fetchSearchResults();
    }, []);

    return (
        <>
            <h1>Thống kê đơn hàng theo từng tháng trong 1 năm</h1>
            <div style={{ width: '100%' }}>
                <h1>Thống kê doanh thu</h1>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                        width={500}
                        height={200}
                        data={data}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Legend />

                        <Tooltip />
                        <Area type="monotone" dataKey="totalRevenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
                <h1>Thống kê số đơn hàng</h1>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        width={500}
                        height={200}
                        data={data}
                        syncId="anyIds"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalOrders" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                        width={500}
                        height={200}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="totalOrders" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        width={500}
                        height={200}
                        data={data1}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalAccountUnLocked" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            ssssss
        </>
    );
}
