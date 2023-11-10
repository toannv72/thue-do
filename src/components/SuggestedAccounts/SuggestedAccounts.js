import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            <AccountItem
                name="Nhạc cụ"
                link="/musicalInstruments"
                img="https://images.unsplash.com/photo-1610087844449-5b1e6f34032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            />
            <AccountItem
                name="Công Nghệ"
                link="/technology"
                img="https://cdn.tgdd.vn/Files/2019/10/30/1213974/nguyen-ly-hoat-dong-cua-may-anh-co-the-ban-chua-biet.jpg"
            />
            <AccountItem
                name="Trang Sức"
                link="/jewelry"
                img="https://ngoctham.com/wp-content/uploads/2021/11/01_7.jpg"
            />
            <AccountItem
                name="Thể Thao"
                link="/sport"
                img="https://cdnmedia.webthethao.vn/uploads/media/images/2018/9/29/obslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgfkuobslkaupsgpz-1538207585003357495977.jpg"
            />

            {/* <p className={cx('more-btn')}>See all</p> */}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
