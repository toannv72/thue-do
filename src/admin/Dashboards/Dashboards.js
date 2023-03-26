import axios from 'axios';
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
    const [year, setYear] = useState(2023);
    // useEffect(() => {
    //     const fetchSearchResults = async () => {
    //         const response = await fetch(`${process.env.REACT_APP_BASE_URLS}order/getStatic/${year}`);
    //         const data = await response.json();
    //         setData(data);
    //     };
    //     fetchSearchResults();
    // }, [year]);
    // useEffect(() => {
    //     const fetchSearchResults = async () => {
    //         const response = await fetch(`${process.env.REACT_APP_BASE_URLS}users/getStatic/${year}`);
    //         const data = await response.json();
    //         setData1(data);
    //     };
    //     fetchSearchResults();
    // }, [year]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}users/getStatic/${year}`)
            .then((response) => {
                setData1(response.data);

            })
    }, [year]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}order/getStatic/${year}`)
            .then((response) => {
                setData(response.data);

            })
    }, [year]);
    return (
        <>
            <h1 className="control-label col-md-2 col-md-offset-2" htmlFor="id_accomodation">
                Chọn năm
            </h1>
            <div className="col-md-2">
                <select
                    className="form-control"
                    id="id_accomodation"
                    onChange={(event) => setYear(event.target.value)}
                >
                    {Array.from({ length: new Date().getFullYear() - 1999 }, (_, index) => {
                        const year = new Date().getFullYear() - index;
                        return <option key={year} value={year}>{year}</option>;
                    })}
                </select>
            </div>
            <div className="form-group" >
             
            </div><br></br>
            <div style={{ width: '100%', marginTop: 100 }}>
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
                <h1>Số đơn hàng</h1>
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


            </div>
           
        </>
    );
}
