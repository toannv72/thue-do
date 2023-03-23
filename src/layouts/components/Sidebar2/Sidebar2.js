import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    User,
    LiveActiveUser,
    Lock,
    LiveActiveLock,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar2() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {/* <MenuItem
                    title="Địa Chỉ Giao Hàng"
                    to={config.routes.settings}
                    icon={<User />}
                    activeIcon={<LiveActiveUser />}
                /> */}
                <MenuItem
                    title="Thông Tin"
                    to={config.routes.information}
                    icon={<User />}
                    activeIcon={<LiveActiveUser />}
                />
                {/* <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} /> */}
                <MenuItem
                    title="Đổi Mật Khẩu"
                    to={config.routes.password}
                    icon={<Lock />}
                    activeIcon={<LiveActiveLock />}
                />
            </Menu>

            <SuggestedAccounts label="Danh mục sản phẩm" />
        </aside>
    );
}

export default Sidebar2;
