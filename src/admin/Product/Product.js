
import config from "~/config";
import Menu, { MenuItem } from "../Menu";
import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);
export default function Product() {
    return (
        <>
            <Menu>
                <div className={cx('function')}>
                    <div className={cx('')}>
                        <MenuItem title="Thêm sản phẩm" to={config.routes.adminCreateProduct} />
                    </div>
                    <div className={cx('')}>
                        <MenuItem title="Quản lý sản phẩm " to={config.routes.adminProductManagement} />
                    </div>
                </div>
            </Menu>
        </>
    );
}