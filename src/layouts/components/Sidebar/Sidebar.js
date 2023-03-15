import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    // HomeActiveIcon,
    UserGroupIcon,
    // UserGroupActiveIcon,
    // LiveIcon,
    // LiveActiveIcon,
   
    BlogActiveIcon,
   
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeIcon />} />
                <MenuItem
                    title="Sản phẩm "
                    to={config.routes.product}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupIcon />}
                />
                {/* <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} /> */}
                <MenuItem
                    title="Blog"
                    to={config.routes.blog}
                    icon={<BlogActiveIcon />}
                    activeIcon={<BlogActiveIcon />}
                />
            </Menu>

            <div className={cx('danh_muc')}>
                <SuggestedAccounts label="Danh mục sản phẩm" />
            </div>
        </aside>
    );
}

export default Sidebar;
