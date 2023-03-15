import React from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);

export default function Payment() {
    return (
        <div className={cx("payment")}>
            <div className={cx("content")}>
                <div className={cx("wrap")}>
                    <div className={cx("main")}>
                        <div className={cx("main-header")}>
                            <a href="/" className={cx("logo")}>
                                <h1 className={cx("logo-text")}>
                                    ThueDo</h1>
                            </a>
                        </div>
                        <div className={cx("main-content")}>
                            <div>
                                <div className={cx("section")}>
                                    <div className={cx("section-header")}>
                                        <svg
                                            width="50"
                                            height="50"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="#000"
                                            stroke-width="2"
                                            className={cx("hanging-icon")}
                                        >
                                            <path
                                                d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"
                                                className={cx("checkmark_circle")}>
                                                
                                                </path>
                                            <path
                                                d="M15 24.51l7.307 7.308L35.125 19"
                                                className={cx("checkmark_check")}>
                                                
                                                </path>
                                        </svg>

                                        <div className={cx("os-header-heading")}>
                                            <h2 className={cx("os-header-title")}>
                                                Đặt hàng thành công</h2>
                                            <span className={cx("os-order-number")}>
                                                Mã đơn hàng #100078</span>
                                            <br />
                                            <br />
                                            <span className={cx("os-description")}>
                                                Cám ơn bạn đã mua hàng!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("section thank-you-checkout-info")}>
                                    <div className={cx("section-content")}>
                                        <div className={cx("content-box")}>
                                            <div className={cx("sidebar")}>
                                                <div className={cx("sidebar-content")}>
                                                    <div className={cx("order-summary order-summary-is-collapsed")}>
                                                        <h2 className={cx("visually-hidden")}>
                                                            Thông tin đơn hàng</h2>
                                                        <div className={cx("order-summary-sections")}>
                                                            <div
                                                                className={cx("order-summary-section")}
                                                                data-order-summary-section="line-items"
                                                            >
                                                                <table className={cx("product-table")}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Hình ảnh
                                                                                </span>
                                                                            </th>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Mô tả
                                                                                </span>
                                                                            </th>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Thời gian thuê
                                                                                </span>
                                                                            </th>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Giá
                                                                                </span>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr
                                                                            data-product-id="1045314722"
                                                                            data-variant-id="1100129951"
                                                                            className={cx("product")}>
                                                                            <td className={cx("product-image")}>
                                                                                <div className={cx("product-thumbnail")}>
                                                                                    <div className={cx("product-thumbnail-wrapper")}>
                                                                                        <img
                                                                                            alt="Máy ảnh"
                                                                                            src="1559701942335_9065535.jpg"
                                                                                            className={cx("product-thumbnail-image")}>
                                                                                            
                                                                                            </img>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className={cx("product-description")}>
                                                                                <span className={cx("product-description-name")}>
                                                                                    Máy ảnh
                                                                                </span>
                                                                            </td>

                                                                            <td className={cx("product-quantity-visually-hidden")}>
                                                                                14/03/2023-15/03/2023
                                                                            </td>
                                                                            <td className={cx("product-price")}>
                                                                                <span className={cx("order-summary-emphasis")}>
                                                                                    1,560,000₫
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            <div
                                                                className={cx("order-summary-section order-summary-section-total-lines payment-lines")}
                                                                data-order-summary-section="payment-lines"
                                                            >
                                                                <table className={cx("total-line-table")}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Mô tả
                                                                                </span>
                                                                            </th>
                                                                            <th scope="col">
                                                                                <span className={cx("visually-hidden")}>
                                                                                    Giá
                                                                                </span>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr className={cx("total-line")}>
                                                                            <td className={cx("total-line-name")}>
                                                                                Tạm tính
                                                                            </td>
                                                                            <td className={cx("total-line-price")}>
                                                                                <span
                                                                                    data-checkout-subtotal-price-target="156000000"
                                                                                    className={cx("order-summary-emphasis")}>
                                                                                    1,560,000₫
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className={cx("total-line ")}>
                                                                            <td className={cx("total-line-name")}>
                                                                                Tiền cọc
                                                                            </td>
                                                                            <td className={cx("total-line-price")}>
                                                                                <span
                                                                                    data-checkout-desposit-price-target="10000000"
                                                                                    className={cx("order-summary-emphasis")}>
                                                                                    10,000,000₫
                                                                                </span>
                                                                            </td>
                                                                        </tr>

                                                                        <tr className={cx("total-line")}>
                                                                            <td className={cx("total-line-name")}>
                                                                                Phí ship
                                                                            </td>
                                                                            <td className={cx("total-line-price")}>
                                                                                <span
                                                                                    data-checkout-total-shipping-target="0"
                                                                                    className={cx("order-summary-emphasis")}>
                                                                                    {' '}
                                                                                    Miễn phí
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                    <tfoot className={cx("total-line-table-footer")}>
                                                                        <tr className={cx("total-line")}>
                                                                            <td className={cx("total-line-name")}>
                                                                                <span className={cx("payment-due-label-total")}>
                                                                                    Tổng tiền
                                                                                </span>
                                                                            </td>
                                                                            <td className={cx("total-line-name payment-due")}>
                                                                                <span className={cx("payment-due-currency")}>
                                                                                    VND
                                                                                </span>
                                                                                <span
                                                                                    data-checkout-payment-due-target="1156000000"
                                                                                    className={cx("payment-due-price")}>
                                                                                    11,560,000₫
                                                                                </span>
                                                                                {/* <span className={cx("checkout_version" display:none="" data_checkout_version="0")}>
                                                        </span> */}
                                                                            </td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx("content-box-row content-box-row-padding")}>
                                                <div className={cx("section-content")}>
                                                    <div className={cx("section-content-column")}>
                                                        <h3>Thông tin vận chuyển</h3>
                                                        TrangVT
                                                        <br />
                                                        0987654321
                                                        <br />
                                                        <br />
                                                        Hồ Chí Minh
                                                        <br />
                                                        KTX khu B ĐHQG
                                                        <br />
                                                        <h3>Phương thức thanh toán</h3>
                                                        <p>Thanh toán khi giao hàng (COD)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("step-footer")}>
                                    <a href="/" className={cx("step-footer-continue-btn btn")}>
                                        <span className={cx("btn-content")}>
                                            Tiếp tục thuê</span>
                                    </a>

                                    <p className={cx("step-footer-info")}>
                                        <i className={cx("icon icon-os-question")}>

                                        </i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
