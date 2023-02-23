import { useEffect, useState } from 'react';
import './Pay.css';

function Settings() {
    const currentUser = localStorage.getItem('user');
    const User = JSON.parse(localStorage.getItem('user'));
 const currentUrl = window.location.href;
 const urlParts = currentUrl.split('pay:');
    const lastPart = urlParts[urlParts.length - 1];
    

     const [products, setProducts] = useState([]);
     const [error, setError] = useState(null);
     const [isLoaded, setIsLoaded] = useState(false);
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
                <div class="pay-main">
                    <div class="border-envelop"></div>
                    <div class="pay-header-user-location">
                        <div class="pay-info">
                            <div class="pay-info-item i-name-phone">
                                {' '}
                                <span class="pay-header-user-name">
                                    {User.firstName}
                                    {User.lastName}
                                </span>
                                <span class="pay-header-user-phone">+0333875398</span>
                            </div>
                            <div class="pay-info-item i-phone">
                                {' '}
                                <span class="pay-header-user-phone">{User.address}</span>
                            </div>
                            <div class="pay-info-item i-change">
                                <a href="" class="pay-change-selected">
                                    <span>Thay đổi</span>
                                </a>
                            </div>
                        </div>
                        <div class="pay-container">
                            <div class="pay-header-selection header-res">
                                <div class="pay-product">
                                    <b> Sản phẩm </b>
                                </div>
                                <div class="pay-price">Đơn giá</div>
                                <div class="pay-quantity">Ngày thuê</div>
                                <div class="pay-total-price">Thành tiền</div>
                            </div>

                            <div class="pay-header-selection">
                                <div class="pay-product product-selected">
                                    <div class="pay-item-image">
                                        <img class="image-item" alt="" src={products.images[0].url} />
                                    </div>
                                    <div class="pay-item-info-name">{products.name}</div>
                                    <div class="pay-item-info-type">
                                        <span class="pay-item-span-type"> Size Z</span>
                                    </div>
                                </div>
                                <div class="pay-price">{products.price}</div>
                                <div class="pay-quantity">1</div>
                                <div class="pay-total-price">{products.price}</div>
                            </div>

                            <div class="pay-submit">
                                <div class="pay-item-voucher">
                                    <div class="pay-notice-voucher"> </div>
                                    <div class="pay-choosing-voucher">
                                        <a class="pay-item-btn-change-boucher"> </a>
                                    </div>
                                </div>
                                <div class="pay-item-footer">
                                    <div class="pay-item-footer-transport">
                                        <div class=" pay-footer-noting">
                                            <div class="pay-footer-noting-lb">Lời nhắn</div>
                                            <div class="pay-footer-noting">
                                                {' '}
                                                <input
                                                    class="pay-footer-noting-txt"
                                                    placeholder="Lưu ý cho người bán"
                                                />
                                            </div>
                                        </div>

                                        <div class=" pay-footer-shipping">
                                            <div class="pay-shipping_unit-transport"> </div>

                                            <div class="pay-shipping-info">Đặt cọc</div>
                                        </div>
                                        <div div="pay-shipping-change-delivery">
                                            <div class="pay-shipping-change-transporter">
                                                {/* <dt class="pay-totalprice-label"></dt> */}
                                                <dd class="pay-total-price-payment">0</dd>
                                            </div>
                                        </div>
                                    </div>
                                    <div div="pay-shipping-change-delivery">
                                        <div class="pay-shipping-change-transporter">
                                            <dt class="pay-totalprice-label"> Tổng số tiền thanh toán </dt>
                                            <dd class="pay-total-price-payment">{products.price} </dd>
                                        </div>
                                    </div>
                                </div>

                                <div class="pay-footer-sunmit divSubmitBtn">
                                    <div class="div-payment">
                                        <input type="button" value="Thanh toán" class="pay-submit-btn" />
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
