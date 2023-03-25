import { Pagination, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';
import './style.css';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Button, Dialog, DialogActions } from '@mui/material';
import styles from './Order.module.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Menu, { MenuItem } from '../Menu';
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
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAll?page=${currentPage - 1}&size=6&sort=id%2Cdesc`)
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
                            <MenuItem title="Đơn thuê" to={config.routes.adminOrder2} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đơn hoàn thành" to={config.routes.adminOrder3} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Đơn hủy" to={config.routes.adminOrder4} />
                        </div>
                    </div>
                </Menu>
            </>
        );
    }
}
