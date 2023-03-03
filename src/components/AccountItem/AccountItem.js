import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <a href={`/products:${data.id}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.images[0].url} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                    {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
                </h4>
                <span className={cx('username')}>{data.price}</span>
            </div>
        </a>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
