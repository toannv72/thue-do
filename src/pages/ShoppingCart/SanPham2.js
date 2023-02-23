import classNames from 'classnames/bind';
import styles from './SanPham.module.scss';

function SanPham2() {
    const cx = classNames.bind(styles);

    return (
        <>
            <div className={cx('wrap cf')}>
                <h1 className={cx('projTitle')}>
                    Responsive Table<span>-Less</span> Shopping Cart
                </h1>

                <div className={cx('cart')}>
                    <div className={cx('cartWrap')}>
                        <div className={cx('items')}>
                            <div className={cx('infoWrap')}>
                                <div className={cx('cartSection')}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTqtUVLKm2G3CzOBAUbIZQhnMxgtSOn7me481QeEPr&usqp=CAE&s"
                                        alt=""
                                        className={cx('itemImg')}
                                    />

                                    <h3>Item Name 1</h3>
                                    <div className={cx('prodTotal ')}>
                                        <p>$15.00</p>
                    </div>
                    <button> Thuê</button>
                                    <div className={cx('cartSectio')}>
                                        <a href="#" className={cx('remove')}>
                                            x
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('items')}>
                            <div className={cx('infoWrap')}>
                                <div className={cx('cartSection')}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTqtUVLKm2G3CzOBAUbIZQhnMxgtSOn7me481QeEPr&usqp=CAE&s"
                                        alt=""
                                        className={cx('itemImg')}
                                    />

                                    <h3>Item Name 1</h3>
                                    <div className={cx('prodTotal ')}>
                                        <p>$15.00</p>
                                    </div>
                                    <div className={cx('cartSectio')}>
                                        <a href="#" className={cx('remove')}>
                                            x
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('items')}>
                            <div className={cx('infoWrap')}>
                                <div className={cx('cartSection')}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTqtUVLKm2G3CzOBAUbIZQhnMxgtSOn7me481QeEPr&usqp=CAE&s"
                                        alt=""
                                        className={cx('itemImg')}
                                    />

                                    <h3>Item Name 1</h3>
                                    <div className={cx('prodTotal ')}>
                                        <p>$15.00</p>
                                    </div>
                                    <div className={cx('cartSectio')}>
                                        <a href="#" className={cx('remove')}>
                                            x
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        </>
    );
}

export default SanPham2;
