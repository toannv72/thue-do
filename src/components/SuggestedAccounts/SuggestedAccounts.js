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
                link="/fashion"
                img="https://images.unsplash.com/photo-1610087844449-5b1e6f34032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            />
            <AccountItem
                name="Công Nghệ"
                link="/technology"
                img="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333741670_1401215150705726_7311997147277245387_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-HLp8XZ8gFcAX-zD5Ln&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdQoxQVP2p3i-iPzva1RB9tItjm8lY5w8WRvhoY4KczdcQ&oe=64244E8D"
            />
            <AccountItem
                name="Trang Sức"
                link="/jewelry"
                img="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333600127_194346569951985_3609327566465129901_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=g-7P-tVVTB8AX8jbwQo&tn=0JSHJhxrrqbYvLZr&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSf2Tzd4LUkADfAZ0chsBPF9ILKVI5GP261TX9kVGcEbA&oe=64244825"
            />
            <AccountItem
                name="Thể Thao"
                link="/sport"
                img="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/328365879_743792684027703_328927088686978532_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=MAYA699Z-HEAX-ub3ef&_nc_ht=scontent.fsgn2-5.fna&oh=03_AdRxGq0l4CpgoTYCL-ydbrN7S3KJfdGCxRrrug9m9FFbgA&oe=642452B5"
            />

            {/* <p className={cx('more-btn')}>See all</p> */}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
