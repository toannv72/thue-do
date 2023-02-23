import styles from './FeaturedTitle.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FeaturedTitle({ titles, children }) {
    return (
        <>
            <div className={cx('Featured')}>
                <div className={cx('text-index')}>{titles}</div>
            </div>
            {children}
        </>
    );
}

export default FeaturedTitle;
