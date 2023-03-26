import { Pagination, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';

import classNames from 'classnames/bind';
import moment from 'moment';
import { Button, Dialog, DialogActions } from '@mui/material';
import styles from '../Order.module.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Menu, { MenuItem } from '~/admin/Menu';
import config from '~/config';
const cx = classNames.bind(styles);

export default function Order() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemOne, setItemOne] = useState([]);
    const [open, setOpen] = useState(false);
    const [PENDING, setPENDING] = useState(false);

    const [item, setItem] = useState(null);
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);

    const [status, setStatus] = useState('');
    const [contend, setContend] = useState('');
    const handleEdit = () => {
        setShowEditConfirmation(true);
    };
    const cancelEdit = () => {
        setShowEditConfirmation(false);
        setContend('');
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAllStatus?page=${currentPage - 1}&size=6&status=CONFIRMED&sort=id%2Cdesc`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    setTotalPage(result.totalPage);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    throw new Error(error.message);
                },
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error.message);
            });
        cancelEdit();
    }, [currentPage, PENDING]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log(value);
    };
    useEffect(() => {
        if (PENDING) {
            axios
                .put(`${process.env.REACT_APP_BASE_URLS}order/updateStatus/${item}?status=${status}&contend=${contend}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(`thành công ${item}`);
                        if (status === 'CANCELLED') {
                            toast.warning(`Đã hủy đơn hàng!`);
                        } else {
                            toast.success(`Đã xác nhận đơn hàng thành công!`);
                        }
                        setPENDING(false);
                    } else {
                        toast.error(response.response.data.message);
                        setPENDING(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response.data.message);
                    toast.error(error.response.data.message);

                    setPENDING(false);
                });
        }
    }, [PENDING, item]);
    function handeOk() {
        setPENDING(true);
    }

    // console.log(item);
    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Menu>
                    <div className={cx('function')}>
                        <div className={cx('')}>
                            <MenuItem title="Đơn mới" to={config.routes.adminOrder1} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đơn thuê" to={config.routes.adminOrder5} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đang thuê" to={config.routes.adminOrder2} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đơn hoàn thành" to={config.routes.adminOrder3} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đơn hủy" to={config.routes.adminOrder4} />
                        </div>
                    </div>
                </Menu>
                <ToastContainer />
             
                <div
                    className={cx('project-boxes jsGridView')}
                    style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
                >
                    {items.contends.map((item, index) => (
                        <div className={cx('project-box-wrapper')} key={index}>
                            <div
                                className={cx('project-box')}
                                style={item.status === 'CANCELLED' ? { backgroundColor: '#ffd3e2' } : {}}
                            >
                                <div className={cx('project-box-header')}>
                                    <div>
                                        <div style={{ marginBottom: 30 }}>
                                            <span>
                                                Ngày thuê:{' '}
                                                {moment(item.orderDetails[0].orderBorrowDate).format('YYYY-MM-DD')}
                                            </span>
                                            <span style={{ marginLeft: 50 }}>
                                                Ngày trả:{' '}
                                                {moment(item.orderDetails[0].orderReturnDate).format('YYYY-MM-DD')}
                                            </span>
                                        </div>

                                        <span>
                                            Số ngày thuê:
                                            {moment(item.orderDetails[0].orderReturnDate).diff(
                                                moment(item.orderDetails[0].orderBorrowDate),
                                                'days',
                                            ) + 1}
                                        </span>
                                    </div>
                                    <div className={cx('more-wrapper')}>
                                        {/* <button className={cx('project-btn-more')}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={cx('feather feather-more-vertical')}
                                            >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="12" cy="5" r="1" />
                                                <circle cx="12" cy="19" r="1" />
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                                <div className={cx('project-box-content-header')}>
                                    <p className={cx('box-content-header')}>{item.orderDetails[0].product.name}</p>

                                    <p className={cx('box-content-header')}>{item.name}</p>
                                    <p className={cx('box-content-subheader')}>Địa chỉ: {item.address}</p>

                                    <p className={cx('box-content-subheader')}>SĐT:{item.phone}</p>
                                    <p className={cx('box-content-subheader')}>Lời nhắn: {item.message}</p>
                                    <p className={cx('box-content-subheader')}>
                                        Số tiền thu:{item.totalPrice.toLocaleString('vi-VN')}đ
                                    </p>
                                </div>
                                <div className={cx('box-progress-wrapper')}>
                                    {/* <p className={cx('box-progress-header')}>Progress</p> */}
                                    <div className={cx('box-progress-bar')}>
                                        <span className={cx('box-progress')}></span>
                                    </div>
                                </div>
                                <div className={cx('project-box-footer')}>
                                    <div className={cx('participants')}>
                                        <button
                                            className={cx('days-left')}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            onClick={() => {
                                                setItemOne(item);
                                                handleClickOpen();
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={cx('feather feather-plus')}
                                            >
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                            Chi tiết
                                        </button>
                                    </div>
                                    {/* <div className={cx('days-left')}>2 Days Left</div> */}

                                    {item.status === 'CANCELLED' ? (
                                        <>
                                            <h3 style={{ color: 'red' }}>Đơn hàng đã bị hủy</h3>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status === 'PENDING' ? (
                                        <>
                                            <button
                                                className={cx('ok')}
                                                onClick={() => {
                                                    handeOk();
                                                    setStatus('CONFIRMED');
                                                    setItem(item.orderDetails[0].id);
                                                }}
                                            >
                                                Xác nhận
                                            </button>

                                            <button
                                                className={cx('huy')}
                                                onClick={() => {
                                                    handleEdit();
                                                    setStatus('CANCELLED');
                                                    setItem(item.orderDetails[0].id);
                                                }}
                                            >
                                                Hủy
                                            </button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status === 'CONFIRMED' ? (
                                        <>
                                            <button
                                                className={cx('ok')}
                                                onClick={() => {
                                                    handeOk();
                                                    setStatus('DELIVERING');
                                                    setItem(item.orderDetails[0].id);
                                                }}
                                            >
                                                Đã giao
                                            </button>

                                            <h2 style={{ color: 'blue' }}>Đã xác nhận</h2>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status === 'DELIVERING' ? (
                                        <>
                                            <button
                                                className={cx('ok')}
                                                onClick={() => {
                                                    handeOk();
                                                    setStatus('PAID');
                                                    setItem(item.orderDetails[0].id);
                                                }}
                                            >
                                                Xác nhận đã thu hồi
                                            </button>

                                            <h2 style={{ color: 'blue' }}>Đang được thuê</h2>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status === 'PAID' ? (
                                        <>
                                            <h2 style={{ color: 'blue' }}>Đơn thành công</h2>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <div className={cx('days-left1')}>
                                        Số ngày thuê:
                                        {moment(item.orderDetails[0].orderReturnDate).diff(
                                            moment(item.orderDetails[0].orderBorrowDate),
                                            'days',
                                        ) + 1}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </p>
                <Dialog
                    maxWidth={1100}
                    // maxHeight={800}
                    open={open}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogActions>
                        <div>
                            <div role="dialog" aria-modal="true">
                                <div className={cx('main')}>
                                    <div
                                        style={{
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            fontSize: 13,
                                            margin: '0 auto',
                                            padding: 0,
                                        }}
                                    >
                                        <table
                                            align="center"
                                            border="0"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                                padding: 0,
                                                borderSpacing: 0,
                                                tableLayout: 'fixed',
                                                borderCollapse: 'collapse',
                                                backgroundColor: '#f5f5f5',
                                            }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: 0, margin: 0 }}>
                                                        <table
                                                            align="center"
                                                            border="0"
                                                            cellPadding="0"
                                                            cellSpacing="0"
                                                            width="600"
                                                            style={{ borderCollapse: 'collapse' }}
                                                            bgcolor="#ffffff"
                                                        >
                                                            <tbody>
                                                                <tr>
                                                                    <td bgcolor="#203467" width="100%" valign="top">
                                                                        <table
                                                                            border="0"
                                                                            cellPadding="0"
                                                                            cellSpacing="0"
                                                                            width="100%"
                                                                        >
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style={{
                                                                                            fontSize: 20,
                                                                                            color: '#ffffff',
                                                                                            padding: '28 0 0 0',
                                                                                            textAlign: 'center',
                                                                                        }}
                                                                                    >
                                                                                        Thông tin đơn hàng
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td
                                                                                        style={{
                                                                                            fontSize: 14,
                                                                                            color: '#ffffff',
                                                                                            padding: '10 0 28 0',
                                                                                            textAlign: 'center',
                                                                                        }}
                                                                                    >
                                                                                        Mã đơn hàng:{itemOne.id}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table
                                                                            border="0"
                                                                            cellPadding="0"
                                                                            cellSpacing="0"
                                                                            width="100%"
                                                                            bgcolor="#ffffff"
                                                                        >
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style={{ padding: '0 0 22 0' }}
                                                                                        colSpan={2}
                                                                                    >
                                                                                        <table
                                                                                            border="0"
                                                                                            cellPadding="0"
                                                                                            cellSpacing="0"
                                                                                            style={{
                                                                                                background: '#f5f5f5',
                                                                                                padding: '3 0 0 0',
                                                                                                width: '100%',
                                                                                            }}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        colSpan={2}
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '30 10 0 30',
                                                                                                            fontSize: 12,
                                                                                                            color: '#666666',
                                                                                                        }}
                                                                                                    >
                                                                                                        Kính chào Quý
                                                                                                        khách
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#333333',
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                itemOne.name
                                                                                                            }
                                                                                                        </strong>
                                                                                                        <br />
                                                                                                        <br /> Chân
                                                                                                        thành cảm ơn Quý
                                                                                                        khách đã mua sắm
                                                                                                        !
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        colSpan={2}
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '18 10 0 30',
                                                                                                            fontSize: 12,
                                                                                                            color: '#666666',
                                                                                                        }}
                                                                                                    >
                                                                                                        Đơn hàng của Quý
                                                                                                        khách hiện đã
                                                                                                        được tiếp nhận
                                                                                                        và sẽ giao đến
                                                                                                        địa chỉ nhận
                                                                                                        hàng trong thời
                                                                                                        gian sớm nhất.
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr></tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        colSpan={2}
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '15 10 0 30',
                                                                                                            fontSize: 12,
                                                                                                            color: '#666666',
                                                                                                        }}
                                                                                                    >
                                                                                                        Chúng tôi hy
                                                                                                        vọng Quý khách
                                                                                                        hài lòng với
                                                                                                        trải nghiệm mua
                                                                                                        sắm và các sản
                                                                                                        phẩm đã chọn.
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        height="1"
                                                                                                        width=""
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '15 10 0 30',
                                                                                                            margin: 0,
                                                                                                        }}
                                                                                                    ></td>
                                                                                                    <td
                                                                                                        width=""
                                                                                                        // style="padding:0,margin:0"
                                                                                                    ></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td colSpan={2}>
                                                                                                        <table
                                                                                                            style={{
                                                                                                                background:
                                                                                                                    '#fff',
                                                                                                                width: '97%',
                                                                                                                margin: '0 auto ',
                                                                                                                border: 'solid 1 #e5e5e5',
                                                                                                            }}
                                                                                                        >
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '15 20',
                                                                                                                        }}
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#25396c',
                                                                                                                                fontSize: 18,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            Thông
                                                                                                                            tin
                                                                                                                            đơn
                                                                                                                            hàng
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '5 20',
                                                                                                                        }}
                                                                                                                        width="50%"
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#666666',
                                                                                                                                fontSize: 12,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            Mã
                                                                                                                            đơn
                                                                                                                            hàng
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '5 20',
                                                                                                                        }}
                                                                                                                        width="50%"
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#333333',
                                                                                                                                fontSize: 12,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            {
                                                                                                                                itemOne.id
                                                                                                                            }
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '5 20',
                                                                                                                        }}
                                                                                                                        width="50%"
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#666666',
                                                                                                                                fontSize: 12,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            Ngày
                                                                                                                            đặt
                                                                                                                            hàng
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '5 20',
                                                                                                                        }}
                                                                                                                        width="50%"
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#333333',
                                                                                                                                fontSize: 12,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            {moment(
                                                                                                                                itemOne.createdDate,
                                                                                                                            ).format(
                                                                                                                                'YYYY-MM-DD',
                                                                                                                            )}
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td colSpan={2}>
                                                                                                        <table
                                                                                                            style={{
                                                                                                                background:
                                                                                                                    '#fff',
                                                                                                                width: '97%',
                                                                                                                margin: '0 auto',
                                                                                                                border: 'solid 1 #e5e5e5',
                                                                                                            }}
                                                                                                        >
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '15 20',
                                                                                                                        }}
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <strong
                                                                                                                            style={{
                                                                                                                                color: '#25396c',
                                                                                                                                fontSize: 18,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            Đơn
                                                                                                                            hàng
                                                                                                                            chi
                                                                                                                            tiết
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '0 10',
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <table>
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            borderBottom:
                                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                                            padding:
                                                                                                                                                '0 10 10 10',
                                                                                                                                            color: '#666666',
                                                                                                                                        }}
                                                                                                                                        width="40%"
                                                                                                                                    >
                                                                                                                                        <strong>
                                                                                                                                            Sản
                                                                                                                                            phẩm
                                                                                                                                        </strong>
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            borderBottom:
                                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                                            padding:
                                                                                                                                                '0 10 10 10',
                                                                                                                                            color: '#666666',
                                                                                                                                        }}
                                                                                                                                        width="20%"
                                                                                                                                    >
                                                                                                                                        <strong>
                                                                                                                                            Ngày
                                                                                                                                            thuê
                                                                                                                                        </strong>
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            borderBottom:
                                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                                            padding:
                                                                                                                                                '0 10 10 10',
                                                                                                                                            color: '#666666',
                                                                                                                                        }}
                                                                                                                                        width="20%"
                                                                                                                                    >
                                                                                                                                        <strong>
                                                                                                                                            Ngày
                                                                                                                                            trả
                                                                                                                                        </strong>
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            borderBottom:
                                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                                            padding:
                                                                                                                                                '0 10 10 10',
                                                                                                                                            color: '#666666',
                                                                                                                                        }}
                                                                                                                                        width="20%"
                                                                                                                                    >
                                                                                                                                        <strong>
                                                                                                                                            Tổng
                                                                                                                                            cộng
                                                                                                                                            (VNĐ)
                                                                                                                                        </strong>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="HEIGHT:5"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                    ></td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style={{:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10}}
                                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                                        width="40%"
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        {itemOne.orderDetails
                                                                                                                                            ? itemOne
                                                                                                                                                  .orderDetails[0]
                                                                                                                                                  .product
                                                                                                                                                  .name
                                                                                                                                            : ''}
                                                                                                                                    </td>

                                                                                                                                    <td
                                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                                        width="20%"
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        {itemOne.orderDetails
                                                                                                                                            ? moment(
                                                                                                                                                  itemOne
                                                                                                                                                      .orderDetails[0]
                                                                                                                                                      .orderReturnDate,
                                                                                                                                              ).format(
                                                                                                                                                  'YYYY-MM-DD',
                                                                                                                                              )
                                                                                                                                            : ''}
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                                        width="20%"
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        {itemOne.orderDetails
                                                                                                                                            ? moment(
                                                                                                                                                  itemOne
                                                                                                                                                      .orderDetails[0]
                                                                                                                                                      .orderBorrowDate,
                                                                                                                                              ).format(
                                                                                                                                                  'YYYY-MM-DD',
                                                                                                                                              )
                                                                                                                                            : ''}
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                                        width="20%"
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        {/* {itemOne.totalPrice.toLocaleString(
                                                                                                                                            'vi-VN',
                                                                                                                                        )} */}
                                                                                                                                        {itemOne.orderDetails
                                                                                                                                            ? (
                                                                                                                                                  itemOne.totalPrice -
                                                                                                                                                  itemOne
                                                                                                                                                      .orderDetails[0]
                                                                                                                                                      .deposit
                                                                                                                                              ).toLocaleString(
                                                                                                                                                  'vi-VN',
                                                                                                                                              )
                                                                                                                                            : ''}

                                                                                                                                        đ
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="HEIGHT:5"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                    ></td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        Số
                                                                                                                                        tiền
                                                                                                                                        cọc
                                                                                                                                        sản
                                                                                                                                        phẩm
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        {itemOne.orderDetails
                                                                                                                                            ? itemOne.orderDetails[0].deposit.toLocaleString(
                                                                                                                                                  'vi-VN',
                                                                                                                                              )
                                                                                                                                            : ''}

                                                                                                                                        đ
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="left" bgcolor="#fffbe2"
                                                                                                                                    >
                                                                                                                                        Tổng
                                                                                                                                        tiền
                                                                                                                                        đơn
                                                                                                                                        hàng
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="right" bgcolor="#fffbe2"
                                                                                                                                    >
                                                                                                                                        {itemOne.totalPrice
                                                                                                                                            ? itemOne.totalPrice.toLocaleString(
                                                                                                                                                  'vi-VN',
                                                                                                                                              )
                                                                                                                                            : ''}

                                                                                                                                        đ
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr></tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={cx('swal-footer')}>
                                    <Button onClick={handleClose} style={{ background: '#0de667', color: 'white' }}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>

                <Dialog
                    maxWidth={1100}
                    // maxHeight={800}
                    open={showEditConfirmation}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={cancelEdit}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogActions>
                        <div style={{ margin: 10, width: 500 }}>
                            <div classNames={cx('TextField1')} style={{ margin: 10, font: 'caption' }}>
                                <h1>Nhập lý do đơn hàng bị hủy</h1>
                                <TextField
                                    // id="filled-disabled"
                                    defaultValue="Hello World"
                                    // variant="filled"
                                    label="Lý do :"
                                    size="Normal"
                                    fullWidth
                                    value={contend}
                                    onChange={(e) => setContend(e.target.value)}
                                ></TextField>
                            </div>
                        </div>
                    </DialogActions>
                    <div>
                        <Button variant="contained" color="success" style={{ margin: 10 }} onClick={handeOk}>
                            Gửi
                        </Button>
                        <Button variant="contained" style={{ margin: 10 }} onClick={cancelEdit}>
                            Hủy
                        </Button>
                    </div>
                </Dialog>
            </>
        );
    }
}
