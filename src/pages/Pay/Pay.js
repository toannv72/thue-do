import './Pay.css';

function Settings() {
    return (
        <>
            <div class="pay-main">
                <div class="border-envelop"></div>
                <div class="pay-header-user-location">
                    <div class="pay-info">
                        <div class="pay-info-item i-name-phone">
                            {' '}
                            <span class="pay-header-user-name">Thảo Lê</span>
                            <span class="pay-header-user-phone">+0333875398</span>
                        </div>
                        <div class="pay-info-item i-phone">
                            {' '}
                            <span class="pay-header-user-phone">
                                1424/3 Ấp CHợ , xã An Nhơn Tây, huyện Củ Chi, TP Hồ Chí Minh
                            </span>
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
                            <div class="pay-quantity">Số lượng</div>
                            <div class="pay-total-price">Thành tiền</div>
                        </div>

                        <div class="pay-header-selection">
                            <div class="pay-product product-selected">
                                <div class="pay-item-image">
                                    <img
                                        class="image-item"
                                        alt=""
                                        src="https://i.postimg.cc/TwY8KjKh/joshua-rondeau-r-AIo-Qyg-EGyw-unsplash-2.jpg"
                                    />
                                </div>
                                <div class="pay-item-info-name">
                                    Váy chuông tay bòng Váy chuông tay bòng Váy chuông tay bòng
                                </div>
                                <div class="pay-item-info-type">
                                    <span class="pay-item-span-type"> Size Z</span>
                                </div>
                            </div>
                            <div class="pay-price">27, 000</div>
                            <div class="pay-quantity">1</div>
                            <div class="pay-total-price">27, 000</div>
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
                                            <input class="pay-footer-noting-txt" placeholder="Lưu ý cho người bán" />
                                        </div>
                                    </div>

                                    <div class=" pay-footer-shipping">
                                        <div class="pay-shipping_unit-transport"> </div>

                                        <div class="pay-shipping-info">Đặt cọc</div>
                                    </div>
                                    <div div="pay-shipping-change-delivery">
                                        <div class="pay-shipping-change-transporter">
                                            {/* <dt class="pay-totalprice-label"></dt> */}
                                            <dd class="pay-total-price-payment">17, 000 </dd>
                                        </div>
                                    </div>
                                </div>
                                <div div="pay-shipping-change-delivery">
                                    <div class="pay-shipping-change-transporter">
                                        <dt class="pay-totalprice-label"> Tổng số tiền thanh toán </dt>
                                        <dd class="pay-total-price-payment">23, 000 </dd>
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
        </>
    );
}

export default Settings;
