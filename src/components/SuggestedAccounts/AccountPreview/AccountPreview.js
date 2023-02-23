import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/178385695_485871159115663_5746834068787279790_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=JcE8C0eoXAkAX_b6xXP&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCCL_x7m6YissQpe4LtIjz2IN3Wxr8oLhLP1Obj16Y7zQ&oe=63E377F7"
                    alt=""
                />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>Nguyễn văn toàn</strong>
                </p>
                <p className={cx('name')}>Nguyễn văn toàn</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>33 </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>33m </strong>
                    <span className={cx('label')}>Lượt mua</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
