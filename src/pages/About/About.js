import styles from './About.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function About() {
    return (
        <>
            <header className={cx("masthead")}>
                <p className={cx("masthead-intro")}>Về chúng tôi</p>
                <h1 className={cx("masthead-heading")}>Chào mừng bạn đến với Thuê Đồ</h1>
            </header>

            <section className={cx("introduction-section")}>
                <h1>Giới thiệu</h1>
                <p>Thuê Đồ là nền tảng online giúp mọi người trong việc thuê quần áo, vật dụng với nhu cầu chỉ sử
                    dụng một lần. Thuê Đồ ra đời với mong muốn hướng đến một lối sống tối giản, tiết kiệm
                    và tiêu dùng bền vững.</p>
                <p>Nếu bạn muốn tiết kiệm hơn không chỉ cho túi tiền của mình mà còn cho môi trường? Bạn có thể cân nhắc thuê đồ tại Thuê Đồ.</p>
            </section>

            <section className={cx("location-section")}>
                <h1>Chính sách bảo mật</h1>
                <p> Việc thu thập dữ liệu chủ yếu trên ứng dụng Thuê Đồ bao gồm: email, điện thoại, tên đăng nhập, mật
                    khẩu đăng nhập, địa chỉ Khách hàng. Đây là các thông tin mà Thuê Đồ cần Khách hàng cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và Thuê Đồ sử dụng nhằm liên hệ xác nhận khi Khách hàng đăng ký sử dụng
                    dịch vụ trên ứng dụng Thuê Đồ, đảm bảo quyền lợi cho Khách hàng.</p>
            </section>

            <section className={cx("questions-section")}>
                <h1>Câu hỏi thường gặp</h1>
                <h2>Đặt hàng và Thanh toán</h2>
                <p> 1. Tìm kiếm sản phẩm: Khách thuê có thể tìm kiếm sản phẩm:     </p>
                <p> 2. Xem thông tin chi tiết của sản phẩm bao gồm: tính năng, giá thuê và thông tin Chủ tiệm.             </p>
                <p> 3. Nếu muốn thuê sản phẩm nào, Khách thuê vui lòng chọn “Thêm vào giỏ” hoặc “Thuê ngay”            </p>
                <p> 4. Tiếp tục thuê sản phẩm khác, nếu muốn.         </p>
                <p> 5. Kiểm tra Giỏ hàng.      </p>
                <p> 6. Chọn kỳ thuê: thời gian nhận và trả sản phẩm.        </p>
                <p> 7. Chọn phương thức thanh toán: Khách thuê có thể chọn thanh toán trực tiếp hoặc thanh toán trực   tuyến               </p>
                <p> 8. Xác nhận tạo đơn hàng        </p>
                <p> Sau khi đơn hàng được xác nhận, Thuê Đồ sẽ gửi email xác nhận đến Khách thuê về các bước tiếp theo.
                    Đồng thời thông báo đến Chủ tiệm để xác nhận đơn hàng.   </p>
            </section>

            <footer className={cx("site-padding")}>
                {/* <p>Say hi to me via social media</p>
                <ul className={cx("social")}>
                   
                </ul>
                <p>Cover image via <a href="https://unsplash.com/" alt="unsplash"><strong>Unsplash</strong></a></p> */}
            </footer>
        </>
    )
}
export default About;