import styles from './SanPham2.module.scss';
import classNames from 'classnames/bind';
import Splitting from 'splitting';

Splitting();
const cx = classNames.bind(styles);

function SanPham2() {
    return (
        <main className="main">
       
            <div className={cx("card")}>
                <img
                    src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                    alt="A City skyline at sunset"
                />
            
            </div>
            <div className={cx("card")}>
                <img
                    src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                    alt="A City skyline at sunset"
                />
                
            </div>
        </main>
    );
}

export default SanPham2;
