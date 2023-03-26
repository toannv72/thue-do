import axios from 'axios';
import { useEffect, useState } from 'react';
import avatar from "./21-avatar-flat (1).gif";
import product from "./324523833_1383239042222408_8590968072928708208_n.gif";
import blogs from "./336820258_2355571661283833_6264624024996388187_n.png";
import orders from "./336676214_606604907677715_5966479179866449110_n.png";

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styles from "./dashboard.module.css";
export default function Dashboard() {
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [blog, setBlog] = useState([]);
    const [order, setOrder] = useState([]);
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
        axios.get(`${process.env.REACT_APP_BASE_URLS}products/getAllProduct?page=0&size=20`)
            .then((response) => {
                setProducts(response.data);

            })
    }, []);
    console.log(user.totalItem);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}users/getAll?page=0&size=20`)
            .then((response) => {
                setUser(response.data);

            })
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}order/getStatic/${year}`)
            .then((response) => {
                setData(response.data);

            })
    }, [year]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}order/getAll?page=0&size=20`)
            .then((response) => {
                setOrder(response.data);

            })
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URLS}blog/getAllBlog?page=0&size=20`)
            .then((response) => {
                setBlog(response.data);

            })
    }, []);
    return (
        <>
            
            <div className="form-group" >
             
            </div><br></br>
            <div className={styles.col_dash}>
                <div className={styles.quick}>
                    <div className={styles.single_quick}>
                        <div className={styles.icon}>
                            <img src={avatar} alt="img" />
                        </div>
                        <div className={styles.count_content}>
                            <h3>
                                <span>{user.totalItem}</span>
                            </h3>
                            <p>Users</p>
                        </div>
                    </div>
                    <div className={styles.single_quick}>
                        <div className={styles.icon}>
                            <img src={product} alt="img" />
                        </div>
                        <div className={styles.count_content}>
                            <h3>
                                <span>{products.totalItem}</span>
                            </h3>
                            <p>Trips</p>
                        </div>
                    </div>
                    <div className={styles.single_quick}>
                        <div className={styles.icon}>
                            <img src={blogs} alt="img" />
                        </div>
                        <div className={styles.count_content}>
                            <h3>
                                <span>{blog.totalItem}</span>
                            </h3>
                            <p>Blogs</p>
                        </div>
                    </div>
                    <div className={styles.single_quick}>
                        <div className={styles.icon}>
                            <img src={orders} alt="img" />
                        </div>
                        <div className={styles.count_content}>
                            <h3>
                                <span>{order.totalItem}</span>
                            </h3>
                            <p>Orders</p>
                        </div>
                    </div>
                </div>
            </div>

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
            <div style={{ width: '100%', marginTop: 100 }}>
             <h1>Thống kê doanh thu đơn hàng</h1>
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
                <h1>Số đơn hàng đã thuê</h1>
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
