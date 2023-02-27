import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import   './Sidebar.css';
import Menu, { MenuItem } from './Menu';

// import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            />
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css" />
            <Menu>
                <aside
                    className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left"
                    id="show-side-navigation1"
                >
                    <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
                    <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
                        <img
                            className="rounded-pill img-fluid"
                            width="65"
                            src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/244991766_580533039649474_7432751751824164431_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=ogqFSmCU9hcAX_rXWqt&_nc_oc=AQkaAHlbWTdW2cYCr2R6XO8XOyScHpo8MJ7MLK0kkLBxjILWy2uMHCGPYbY2tGVYhGY&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCLraIUKRsIVLYjf5aLrrtbePhcnLApMB9Z768wm46djA&oe=63FAA901"
                            alt=""
                        />
                        <div className="ms-2" style={{ color: 'aliceblue' }}>
                            <h1> ADMIN</h1>
                        </div>
                    </div>

                    {/* <div className="search position-relative text-center px-4 py-3 mt-2">
                        <input
                            type="text"
                            className="form-control w-100 border-0 bg-transparent"
                            placeholder="Search here"
                            style={{ color: 'aliceblue' }}
                        />
                        <i className="fa fa-search position-absolute d-block fs-6"></i>
                    </div> */}

                    <ul className="categories list-unstyled">
                        {/* <li className="">
                            <MenuItem title="Home" to={config.routes.adminHome} />
                        </li> */}
                        <li className="">
                            <MenuItem title="Sản phẩm " to={config.routes.adminProduct} />
                        </li>
                        <li className="">
                            <MenuItem title="Người dùng" to={config.routes.adminUser} />
                        </li>
                        <li className="">
                            <MenuItem title="Blog" to={config.routes.adminBlog} />
                        </li>
                        <li className="">
                            <MenuItem title="Đơn hàng" to={config.routes.adminOrder} />
                        </li>
                        <li className="">
                            <MenuItem title="Thông báo" to={config.routes.adminNotification} />
                        </li>
                    </ul>
                </aside>
            </Menu>
        </aside>
    );
}

export default Sidebar;
