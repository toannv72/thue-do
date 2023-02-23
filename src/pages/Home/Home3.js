import styles from './Home3.module.scss';
import classNames from 'classnames/bind';
// import { IconName } from 'react-icons/ai';
const cx = classNames.bind(styles);

export default function Home3() {
    return (
        <>
            <div className={cx('toan')}>
                <h2>Top danh mục</h2>
                <div className={cx('toan-1')}>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Thời trang</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Giày dép</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Đồ công nghệ</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Phương tiện</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Du lịch</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Sách </div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Mẹ&bé</div>
                        <div></div>
                    </div>
                    <div className={cx('toan-2')}>
                        <div className={cx('toan-index')}>Trang sức</div>
                        <div></div>
                        <div className={cx('toan-3')}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
