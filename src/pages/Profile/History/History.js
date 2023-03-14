import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Menu, { MenuItem } from '../Menu';
import config from '~/config';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';

const cx = classNames.bind(styles);
function History() {
    // const id = localStorage.getItem('username');
    const imgUser = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
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
    console.log(items);
    


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
                                        <button
                                            className={cx('days-left')}
                                            style={{ display: 'flex', alignItems: 'center' }}
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
                                    <div className={cx('days-left')}>
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
        </div>
    );
}

export default History;
