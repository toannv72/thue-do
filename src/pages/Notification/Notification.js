import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import ErrorToast from '~/pages/Product/ErrorToast';
import { Button, Dialog, DialogActions } from '@mui/material';

const cx = classNames.bind(styles);
function Notification() {
    // const id = localStorage.getItem('username');
    const imgUser = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState();
    const [itemHistory, setItemHistory] = useState([]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAllByUser/${imgUser.id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
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
                    <div
                        className={cx('project-boxes jsGridView')}
                        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {items.map((item, index) => (
                            <div className={cx('project-box-wrapper')} key={index}>
                                <div
                                    className={cx('project-box')}
                                    
                                >
                                    {/* <div className={cx('project-box-header')}>
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
                                          
                                        </div>
                                    </div> */}
                                    <div className={cx('project-box-content-header')}>
                                        {/* <p className={cx('')}>
                                            Tên sản phẩm:
                                            <a href={`/products:${item.orderDetails[0].product.id}`}>
                                                {item.orderDetails[0].product.name}
                                            </a>
                                        </p>
                                        <p className={cx('box-content-subheader')}>
                                            Số tiền thuê:
                                            {(item.totalPrice - item.orderDetails[0].deposit).toLocaleString('vi-VN')}đ
                                        </p> */}
                                       Thông báo
                                    </div>
                                    <div className={cx('box-progress-wrapper')}>
                                        <p className={cx('box-progress-header')}>Đơn hàng của bạn đã được xác nhận thành công</p>
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
                                <h2>Chi tiết sản phẩn </h2>
                                <p>{itemHistory.name}</p>
                                <p> {itemHistory.address}</p>
                                <p> {itemHistory.orderDetails ? itemHistory.orderDetails[0].product.name : 'aaa'}</p>

                                <div className={cx('swal-footer')}>
                                    <Button onClick={handleClose} style={{ background: '#0de667', color: 'white' }}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Notification;
