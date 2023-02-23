import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/178385695_485871159115663_5746834068787279790_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=JcE8C0eoXAkAX_b6xXP&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCCL_x7m6YissQpe4LtIjz2IN3Wxr8oLhLP1Obj16Y7zQ&oe=63E377F7"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>van toan</strong>
                            {/* <FontAwesomeIcon className={cx('check')} /> */}
                        </p>
                        <p className={cx('name')}>van toan</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
