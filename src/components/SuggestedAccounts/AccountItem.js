import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ name, link, img }) {
    return (
        <div>
            {/* <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}> */}
            <a href={link}>
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={img} alt="" />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{name}</strong>
                        </p>
                        {/* <p className={cx('name')}></p> */}
                    </div>
                </div>
            </a>
            {/* </Tippy> */}
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
