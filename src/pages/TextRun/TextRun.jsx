import styles from './TextRun.module.scss';

import classNames from 'classnames/bind';

function TextRun() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('div')}>
            <marquee className={cx('running-text')}>
                <p>
                    <i className="fas fa-heart" style={{ color: '#f00' }}></i> Web thuê đồ là một trang web cung cấp dịch vụ
                    cho thuê trang phục và đồ dùng cho các sự kiện như cưới hỏi, sinh nhật, lễ kỷ niệm, tiệc tùng và các
                    sự kiện khác. Trang web cung cấp nhiều loại trang phục và đồ dùng khác nhau, đảm bảo mang đến sự lựa
                    chọn đa dạng và phù hợp với nhu cầu của khách hàng.
                </p>
                <i className="fas fa-certificate" style={{ color: '#f00' }}></i>

                <p>
                    Khách hàng có thể truy cập trang web để lựa chọn sản phẩm mình muốn thuê, từ trang phục dành cho
                    nam, nữ đến trang phục dành cho trẻ em. Ngoài ra, trang web cũng cung cấp các phụ kiện, đồ trang trí
                    như đèn lồng, bàn ghế, kệ hoa và các vật dụng khác để tăng thêm sự lung linh cho buổi tiệc của bạn.
                </p>
                <p>
                    Trang web có giao diện thân thiện, dễ sử dụng, cho phép khách hàng tìm kiếm sản phẩm dễ dàng và đặt
                    hàng nhanh chóng. Bên cạnh đó, trang web cũng có các chính sách đổi trả linh hoạt, giúp khách hàng
                    yên tâm khi thuê sản phẩm tại đây.
                </p>
                <i className="fas fa-feather-alt" style={{ color: '#f00' }}></i>
                <p>
                    Hy vọng giới thiệu về trang web thuê đồ này sẽ giúp bạn có thêm thông tin và lựa chọn phù hợp cho sự
                    kiện của mình.
                </p>
                <i className="fas fa-heart" style={{ color: '#f00' }}></i>
            </marquee>
        </div>
    );
}
export default TextRun;
