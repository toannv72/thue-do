import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';
import './style.css';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Button, Dialog, DialogActions } from '@mui/material';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);

export default function Order() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
          setOpen(true);
      };
      const handleClose = () => {
          setOpen(false);
      };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAll?page=${currentPage - 1}&size=2&sort=id%2Cdesc`)
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
    }, [currentPage]);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log(value);
    };
    console.log(items);
    console.log(error);
    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
                />

                <h1> Order</h1>
                <div
                    className={cx('project-boxes jsGridView')}
                    style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
                >
                    {items.contends.map((item, index) => (
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
                                    <p className={cx('box-content-header')}>{item.name}</p>
                                    <p className={cx('box-content-subheader')}>Địa chỉ: {item.address}</p>
                                    <p className={cx('box-content-subheader')}>
                                        {/* Tên sản phẩm: {item.orderDetails[0].product.name} */}
                                    </p>
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
                                                // setItemHistory(item);
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
                                    <button className={cx('ok')}>Xác nhận</button>{' '}
                                    <button className={cx('huy')}>Hủy</button>
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
                                <h2>Chi tiết sản phẩn </h2>
                                {/* <p>{itemHistory.name}</p>
                                <p> {itemHistory.address}</p>
                                <p> {itemHistory.orderDetails ? itemHistory.orderDetails[0].product.name : 'aaa'}</p> */}

                                <div className={cx('swal-footer')}>
                                    <Button onClick={handleClose} style={{ background: '#0de667', color: 'white' }}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
