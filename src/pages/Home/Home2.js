import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import styles from './Home2.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function name() {
    return (
        <main className={cx('page-content')}>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>THỜI TRANG</h2>
                    <p className={cx('copy')}>
                        Bạn đang cần một món đồ hiệu thật oách để dự một buổi tiệc, tại sao phải bỏ cả đống tiền để mua
                        trong khi bạn chỉ dùng nó chỉ vài tiếng, chụp vài tấm hình post Facebook rồi chẳng khi nào đụng
                        đến nữa. Giải pháp thông minh cho tình huống này là bạn có thể đi thuê. Thuê đồ vừa có thể giải
                        quyết tất cả nhu cầu của bạn vừa tiết kiệm được tiền bạc, thời gian và công sức. Đó là lý do thị
                        trường cho thuê đồ hiệu vô cùng nở rộ thời gian qua.
                    </p>
                    <button className={cx('btn')}>View Trips</button>
                </div>
            </div>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>DU LỊCH</h2>
                    <p className={cx('copy')}>
                        Bạn chuẩn bị cho chuyến du lịch dài ngày sắp tới? Bạn lần đầu đi du lịch khám phá (trekking)
                        nhưng có quá nhiều thứ phải mua? Giải pháp thông minh cho tình huống này là bạn có thể đi thuê.
                        Thuê đồ vừa có thể giải quyết tất cả nhu cầu của bạn vừa tiết kiệm được tiền bạc, thời gian và
                        công sức. Đó là lý do thị trường cho thuê đồ hiệu vô cùng nở rộ thời gian qua.
                    </p>
                    <button className={cx('btn')}>View Trips</button>
                </div>
            </div>
            <div className={cx('card')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>XE MÁY</h2>
                    <p className={cx('copy')}>
                        Thuê xe máy tự lái để du lịch trải nghiệm hiện đang là dịch vụ được ưa chuộng bậc nhất. Không
                        chỉ bởi sự tiện lợi “thích thì đi; mệt thì dừng; đói thì ăn; đẹp thì check in” mà còn mang đến
                        cho du khách sự trải nghiệm trọn vẹn địa điểm du lịch với chi phí rẻ nhất.
                    </p>

                    <a className={cx('btn')} href="https://www.facebook.com/">
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
                    <button className={cx('btn')}>Book Now</button>
                </div>
            </div>
        </main>
    );
}
