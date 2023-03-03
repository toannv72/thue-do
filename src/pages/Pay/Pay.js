import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Pay.css';
import 'react-date-range/dist/styles.css'; // import stylesheet
import 'react-date-range/dist/theme/default.css'; // import theme
import { DateRange } from 'react-date-range';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { Calendar } from 'react-date-range';
function Settings() {
    const currentUser = localStorage.getItem('user');
    const User = JSON.parse(localStorage.getItem('user'));
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('pay:');
    const lastPart = urlParts[urlParts.length - 1];

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const { pathname } = useLocation();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    // console.log(state);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}products/getOne/${lastPart}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, []);
    return (
        <>
            {currentUser ? (
                <div className="pay-main">
                    <div className="border-envelop"></div>
                    <div className="pay-header-user-location">
                        <div className="pay-info">
                            Thông tin nhận hàng:<br></br>
                            <div className="pay-info-item i-name-phone">
                                <span className="pay-header-user-name">
                                    TÊN:
                                    {User.lastName} {''}
                                    {User.firstName}
                                </span>
                            </div>
                            <div className="pay-info-item i-phone">
                                <span className="pay-header-user-phone"> SĐT:{User.phone} </span>
                            </div>
                            <div className="pay-info-item i-phone">
                                <span className="pay-header-user-phone">ĐỊA CHỈ{User.address}</span>
                            </div>
                            <div className="pay-info-item i-change">
                                <a href="" className="pay-change-selected">
                                    <span>Thay đổi</span>
                                </a>
                            </div>
                        </div>
                        <div className="pay-container">
                            <div className="pay-header-selection header-res">
                                <div className="pay-product">
                                    <b> Sản phẩm </b>
                                </div>
                                <div className="pay-price">Đơn giá</div>
                                <div className="pay-quantity">Ngày thuê</div>
                                <div className="pay-total-price">Thành tiền</div>
                            </div>

                            <div className="pay-header-selection">
                                <div className="pay-product product-selected">
                                    <div className="pay-item-image">
                                        <img
                                            className="image-item"
                                            alt=""
                                            src={products.images ? products.images[0].url : ''}
                                        />
                                    </div>
                                    <div className="pay-item-info-name">{products.name}</div>
                                    <div className="pay-item-info-type">
                                        <span className="pay-item-span-type"> </span>
                                    </div>
                                </div>
                                <div className="pay-price">{products.price}</div>
                                <div className="pay-quantity">
                                    <button onClick={handleOpen}>Chọn ngày thuê</button>

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
                                        <DialogContent>
                                            <DateRange
                                                editableDateInputs={false}
                                                onChange={(item) => setState([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                // retainEndDateOnFirstSelection={false}
                                                // onRangeFocusChange={handleRangeFocusChange}
                                                ranges={state}
                                                minDate={new Date()}
                                            />
                                        </DialogContent>
                                        <DialogActions></DialogActions>
                                    </Dialog>
                                </div>
                                <div className="pay-total-price">{products.price}</div>
                            </div>

                            <div className="pay-submit">
                                <div className="pay-item-voucher">
                                    <div className="pay-notice-voucher"> </div>
                                    <div className="pay-choosing-voucher">
                                        {/* <a className="pay-item-btn-change-boucher"> </a> */}
                                    </div>
                                </div>
                                <div className="pay-item-footer">
                                    <div className="pay-item-footer-transport">
                                        <div className=" pay-footer-noting">
                                            <div className="pay-footer-noting-lb">Lời nhắn</div>
                                            <div className="pay-footer-noting">
                                                <input
                                                    className="pay-footer-noting-txt"
                                                    placeholder="Lưu ý cho người bán"
                                                />
                                            </div>
                                        </div>

                                        <div className=" pay-footer-shipping">
                                            <div className="pay-shipping_unit-transport"> </div>

                                            <div className="pay-shipping-info">Đặt cọc</div>
                                        </div>
                                        <div div="pay-shipping-change-delivery">
                                            <div className="pay-shipping-change-transporter">
                                                {/* <dt className="pay-totalprice-label"></dt> */}
                                                <dd className="pay-total-price-payment">{products.deposit}</dd>
                                            </div>
                                        </div>
                                    </div>
                                    <div div="pay-shipping-change-delivery">
                                        <div className="pay-shipping-change-transporter">
                                            <dt className="pay-totalprice-label"> Tổng số tiền thanh toán </dt>
                                            <dd className="pay-total-price-payment">{products.price} </dd>
                                        </div>
                                    </div>
                                </div>

                                <div className="pay-footer-sunmit divSubmitBtn">
                                    <div className="div-payment">
                                        <input type="button" value="Thanh toán" className="pay-submit-btn" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Settings;
