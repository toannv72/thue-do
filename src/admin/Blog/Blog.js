import Menu, { MenuItem } from "../Menu";
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import config from "~/config";

const cx = classNames.bind(styles);
export default function BlogAdmin() {
    return (
        <>
            <Menu>
                <div className={cx('function')}>
                    <div className={cx('')}>
                        <MenuItem title="Đăng blog" to={config.routes.adminCreateBlog} />
                    </div>
                    <div className={cx('')}>
                        <MenuItem title="Quản lý blog " to={config.routes.adminBlogManagement} />
                    </div>
                </div>
            </Menu>
        </>
    );
}