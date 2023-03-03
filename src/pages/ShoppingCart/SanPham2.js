import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ErrorToast from '../Product/ErrorToast';
import styles from './SanPham.module.scss';

function SanPham2() {
    const cx = classNames.bind(styles);
    const { pathname } = useLocation();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [deleteCars, setDeleteCar] = useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const deletecar = async () => {
        if (deleteCars) {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}cart-iteam/delete/${deleteCars}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(`Xóa sản phẩm thành công!`);
            } else {
                toast.error(`Xóa sản phẩm không thành công!`);
            }
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const user = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}cart-iteam/viewCart/${user}`)
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
    }, [open]);
    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                {' '}
                <ToastContainer />
                <div className={cx('wrap cf')}>
                    <h1 className={cx('projTitle')}>
                        Responsive Table<span>-Less</span> Shopping Cart
                    </h1>

                    <div className={cx('cart')}>
                        <div className={cx('cartWrap')}>
                            {items.product.map((e, index) => (
                                <div className={cx('items')} key={index}>
                                    <div className={cx('infoWrap')}>
                                        <div className={cx('cartSection')}>
                                            <img src={e.images[0].url} alt="" className={cx('itemImg')} />

                                            <h3 className={cx('h3')}>{e.name}</h3>
                                            <div className={cx('prodTotal ')}>
                                                <p>{e.price}</p>
                                            </div>
                                            <a href={`./pay:${e.id}`}>
                                                <Button style={{ background: '#fe2c55', color: 'white' }}>
                                                    {' '}
                                                    Thuê
                                                </Button>
                                            </a>
                                            <div className={cx('cartSectio')}>
                                                <button
                                                    href="#"
                                                    className={cx('remove')}
                                                    onClick={() => {
                                                        setDeleteCar(e.idCart);

                                                        handleOpen();
                                                    }}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Dialog
                    // maxWidth={800}
                    // maxHeight={800}
                    open={open}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle></DialogTitle>
                    <DialogContent>Xác nhận xóa sản phẩm ra khỏi giỏ hàng</DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                deletecar();
                                handleClose();
                            }}
                            style={{ background: 'red', color: 'white' }}
                        >
                            Xóa
                        </Button>
                        <Button onClick={handleClose} style={{ background: '#0de667', color: 'white' }}>
                            Hủy{' '}
                        </Button>
                    </DialogActions>
                </Dialog>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
            </>
        );
    }
}
export default SanPham2;
