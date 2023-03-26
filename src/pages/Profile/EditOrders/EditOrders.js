import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from '../History/History.module.scss';
import Menu, { MenuItem } from '../Menu';
import config from '~/config';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import ErrorToast from '~/pages/Product/ErrorToast';
import { Button, Dialog, DialogActions, Pagination } from '@mui/material';

const cx = classNames.bind(styles);
function History() {
    // const id = localStorage.getItem('username');
    const imgUser = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState();
    const [itemHistory, setItemHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); const [totalPage, setTotalPage] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }; const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // console.log(value);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAllHistoryUser/${imgUser.id}?page=${currentPage - 1}&size=5&check=false`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.contends); setTotalPage(result.totalPage);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [imgUser.id]);

    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="back-to-top" style={{ display: 'block', opacity: 1 }}></div>
                <div>
                    <div className="user-header-wrapper">
                        <div className="user-header-inner flexbox">
                            <div className="user-header-overlay"></div>
                            <img
                                className="user-header"
                                src={imgUser.imageUrl ? imgUser.imageUrl : images.noImage1}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="user-info-bar">
                        <div className="ufo-bar-col1"></div>
                        <div className="ufo-bar-col2">
                            <div className="ufo-bar-col2-inner">
                                <div className="user-icon-wrapper">
                                    <img
                                        className="user-icon"
                                        src={imgUser.avatar ? imgUser.avatar : images.noImage}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ufo-bar-col3">
                            <div className="ufo-bar-col3-inner">
                                <div className="username-wrapper-outer">
                                    <div className="username-wrapper">
                                        <h3 className="username-dev">
                                            {!imgUser.firstName
                                                ? imgUser.username
                                                : `${imgUser.firstName} ${imgUser.lastName}`}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ufo-bar-col5"></div>
                    </div>

                    <Menu>
                        <div className={cx('function')}>
                            <div className={cx('')}>
                                <MenuItem title="Đơn đặt hàng " to={config.routes.EditOrders} />
                            </div>
                            <div className={cx('')}>
                                <MenuItem title="Lịch sử" to={config.routes.History} />
                            </div>
                        </div>
                    </Menu>
                    <div
                        className={cx('project-boxes jsGridView')}
                        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {items.map((item, index) => (
                            <div className={cx('project-box-wrapper')} key={index}>
                                <div className={cx('project-box')}>
                                    <div className={cx('project-box-header')}>
                                        <div>
                                            <div>
                                                <span>
                                                    Ngày thuê:{' '}
                                                    {moment(item.orderDetails[0].orderBorrowDate).format('YYYY-MM-DD')}
                                                </span>
                                            </div>

                                            <div>
                                                <span>
                                                    Ngày trả:{' '}
                                                    {moment(item.orderDetails[0].orderReturnDate).format('YYYY-MM-DD')}
                                                </span>
                                            </div>
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
                                        <p className={cx('')}>
                                            Tên sản phẩm:
                                            <a href={`/products:${item.orderDetails[0].product.id}`}>
                                                {item.orderDetails[0].product.name}
                                            </a>
                                        </p>
                                        <p className={cx('box-content-subheader')}>
                                            Số tiền thuê:
                                            {(item.totalPrice - item.orderDetails[0].deposit).toLocaleString('vi-VN')}đ
                                        </p>
                                        <p className={cx('box-content-subheader')}>
                                            Số tiền đặt cọc:{item.orderDetails[0].deposit.toLocaleString('vi-VN')}đ
                                        </p>
                                        <p className={cx('box-content-subheader')}>
                                            Số tiền thê+ đặt cọc:{item.totalPrice.toLocaleString('vi-VN')}đ
                                        </p>
                                    </div>
                                    <div className={cx('box-progress-wrapper')}>
                                        <p className={cx('box-progress-header')}></p>
                                    </div>
                                    <div className={cx('project-box-footer')}>
                                        <div className={cx('participants')}>
                                            <div className={cx('days-left')}>
                                                <Button
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    onClick={() => {
                                                        setItemHistory(item);
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
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('days-left1')}>
                                            Số ngày thuê:{' '}
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
                </div>
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
                                                                                        Mã đơn hàng:{itemHistory.id}
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
                                                                                                                itemHistory.name
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
                                                                                                                margin: '0 auto 10',
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
                                                                                                                            7119538441
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
                                                                                                                            20/11/2017
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
                                                                                                                                        {itemHistory.orderDetails
                                                                                                                                            ? itemHistory
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
                                                                                                                                        {itemHistory.orderDetails
                                                                                                                                            ? moment(
                                                                                                                                                itemHistory
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
                                                                                                                                        {itemHistory.orderDetails
                                                                                                                                            ? moment(
                                                                                                                                                itemHistory
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
                                                                                                                                        {/* {itemHistory.totalPrice.toLocaleString(
                                                                                                                                            'vi-VN',
                                                                                                                                        )} */}
                                                                                                                                        {itemHistory.orderDetails
                                                                                                                                            ? (
                                                                                                                                                itemHistory.totalPrice -
                                                                                                                                                itemHistory
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
                                                                                                                                        {itemHistory.orderDetails
                                                                                                                                            ? itemHistory.orderDetails[0].deposit.toLocaleString(
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
                                                                                                                                        align="left"
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
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        {itemHistory.totalPrice
                                                                                                                                            ? itemHistory.totalPrice.toLocaleString(
                                                                                                                                                'vi-VN',
                                                                                                                                            )
                                                                                                                                            : ''}

                                                                                                                                        đ
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:13,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                                        bgcolor="#fffbe2"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        Số
                                                                                                                                        tiền
                                                                                                                                        còn
                                                                                                                                        lại
                                                                                                                                        cần
                                                                                                                                        thanh
                                                                                                                                        toán
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        bgcolor="#fffbe2"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        {itemHistory.totalPrice
                                                                                                                                            ? itemHistory.totalPrice.toLocaleString(
                                                                                                                                                'vi-VN',
                                                                                                                                            )
                                                                                                                                            : ''}

                                                                                                                                        đ
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        Hình
                                                                                                                                        thức
                                                                                                                                        thanh
                                                                                                                                        toán{' '}
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        Thanh
                                                                                                                                        toán
                                                                                                                                        khi
                                                                                                                                        nhận
                                                                                                                                        hàng
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="left"
                                                                                                                                    >
                                                                                                                                        Tình
                                                                                                                                        trạng
                                                                                                                                        thanh
                                                                                                                                        toán{' '}
                                                                                                                                    </td>
                                                                                                                                    <td
                                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                                        colSpan={
                                                                                                                                            2
                                                                                                                                        }
                                                                                                                                        align="right"
                                                                                                                                    >
                                                                                                                                        Chưa
                                                                                                                                        hoàn
                                                                                                                                        tất
                                                                                                                                        thanh
                                                                                                                                        toán
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
                </Dialog> <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>
        );
    }
}

export default History;
