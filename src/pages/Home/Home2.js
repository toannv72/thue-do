import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import styles from './Home2.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function name() {
    return (
        <main className={cx('page-content')}>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>NHẠC CỤ</h2>
                    <p className={cx('copy')}>
                        Các nhà trị liệu âm nhạc làm việc trong các lĩnh vực liên quan đến sức khỏe, điều trị cho khách
                        hàng ở mọi lứa tuổi từ trẻ sơ sinh đến người già và hỗ trợ các vấn đề và khuyết tật khác nhau.
                        Nhà trị liệu âm nhạc xác định các mục tiêu phù hợp, thu thập và phân tích thông tin về phản ứng
                        của khách hàng đối với âm nhạc và cung cấp các kế hoạch điều trị tùy chỉnh cho phù hợp.
                    </p>
                    <a className={cx('btn')} href="/fashion">
                        Book Now
                    </a>
                </div>
            </div>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>THỂ THAO </h2>
                    <p className={cx('copy')}>
                        Dụng cụ thể thao là vật không thể thiếu trong quá trình tập luyện thể dục thể thao, tuy nhiên
                        nếu bạn không có nhu cầu sử dụng chúng thường xuyên và trong thời gian dài sẽ gây lãng phí. Bên
                        cạnh đó, những dụng cụ thể thao chính hãng, mang đến trải nghiệm tuyệt vời cho người sử dụng
                        thường có giá bán tương đối cao mà không phải ai cũng có thể mua được. Việc thuê dụng cụ thể
                        thao giúp bạn vừa tiết kiệm được chi phí .
                    </p>
                    <a className={cx('btn')} href="/sport">
                        Book Now
                    </a>
                </div>
            </div>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>TRANG SỨC </h2>
                    <p className={cx('copy')}>
                        Trang sức là một trong những món phụ kiện giúp tôn lên vẻ đẹp của bộ trang phục và cá tính của
                        người đeo. Để trang bị một bộ trang sức hoàn chỉnh từ bông tai, dây chuyền, tới vòng tay, nhẫn…
                        sẽ tốn không ít chi phí. Thay vì đầu tư mua vài bộ trang sức của riêng mình, bạn nên lựa chọn
                        hình thức thuê trang sức để luôn được sở hữu những món phụ kiện mới lạ, độc đáo, phù hợp với
                        từng kiểu trang phục hay các sự kiện tham dự.
                    </p>

                    <a className={cx('btn')} href="/jewelry">
                        Book Now
                    </a>
                </div>
            </div>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>CÔNG NGHỆ</h2>
                    <p className={cx('copy')}>
                        Thay vì bỏ ra số tiền lớn từ vài triệu đến vài chục triệu để mua một thiết bị công nghệ xịn sò
                        phục vụ cho công việc, giải trí thì hiện nay bạn hoàn toàn có thể tìm đến những đơn vị dịch vụ
                        thuê để chọn một sản phẩm phù hợp nhu cầu, chi phí để tác nghiệp.
                    </p>
                    <a className={cx('btn')} href="/technology">
                        Book Now
                    </a>
                </div>
            </div>
        </main>
    );
}
