import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div>
            <div className={cx('container')}>
                <div className={cx('a1')}>
                    <a href="/about">
                        <div>VỀ CHÚNG TÔI </div>
                    </a>
                    <a href="/about">
                        <div> DÒNG SẢN PHẨM </div>
                    </a>
                    <a href="/about">
                        <div>CHÍNH SÁCH BẢO MẬT</div>
                    </a>
                    <a href="/about">
                        <div>CHÍNH SÁCH SỬ DỤNG</div>
                    </a>
                    <a href="/about">
                        <div>CÂU HỎI THƯỜNG GẶP</div>
                    </a>
                </div>

                <div className={cx('a2')}>
                    <img src={images.logo} alt="" />
                    Cho thuê những gì bạn cần
                </div>

                <div className={cx('a3')}>
                    <div className={cx('a3-1')}>
                        {' '}
                        <a href="/about">
                            <h3> THÔNG TIN</h3>
                            <p>CÔNG TY TNHH IHC</p>
                            <p>Tầng 3-Số 3 Thủ Đức-Hồ Chí Minh</p>
                            <p>1900333333</p>
                            <p>ihc@fpt.edu.vn</p>
                            <p>MST:0106302932</p>{' '}
                        </a>
                    </div>
                    <div className={cx('a3-1')}>
                        <a href="/about">
                            <h3>LIÊN HỆ</h3>

                            <p>Giới Thiệu</p>
                            <p>Tin Tức</p>
                            <p>Hệ Thống cửa Hàng</p>
                            <p>Trợ Giúp</p>
                        </a>
                    </div>
                    <div className={cx('a3-1')}>
                      
                        <a href="/about">
                            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                            <p>Hỏi đáp</p>
                            <p>Hướng dẫn thuê đồ</p>
                            <p>Đăng ký tài khoản</p>
                            <p>Chính sách giao hàng</p>
                            <p>Chính sách đổi trả hoàn tiền</p>{' '}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
