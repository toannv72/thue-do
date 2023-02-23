import images from '~/assets/images';
import './EditOrders.css';
import classNames from 'classnames/bind';
import styles from '../Product.module.scss';
import Menu, { MenuItem } from '../Menu';
import config from '~/config';

const cx = classNames.bind(styles);
function EditOrders() {
    const id = localStorage.getItem('username');
    const imgUser = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div className="back-to-top" style={{ display: 'block', opacity: 1 }}></div>
            <div>
                <div className="user-header-wrapper">
                    <div className="user-header-inner flexbox">
                        <div className="user-header-overlay"></div>
                        <img className="user-header" src={imgUser.imageUrl} alt="" />
                    </div>
                </div>
                <div className="user-info-bar">
                    <div className="ufo-bar-col1"></div>
                    <div className="ufo-bar-col2">
                        <div className="ufo-bar-col2-inner">
                            <div className="user-icon-wrapper">
                                <img
                                    className="user-icon"
                                    src={imgUser.avatar ? imgUser.avatar : images.noImage}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col3">
                        <div className="ufo-bar-col3-inner">
                            <div className="username-wrapper-outer">
                                <div className="username-wrapper">
                                    <h3 className="username-dev">
                                        {!imgUser.firstName
                                            ? imgUser.username
                                            : `${imgUser.firstName} ${imgUser.lastName}`}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ufo-bar-col5"></div>
                </div>

                <Menu>
                    <div className={cx('function')}>
                        <div className={cx('')}>
                            <MenuItem title="Chỉnh sửa trang cá nhân" to={config.routes.EditProfile} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Chỉnh sửa đơn đặt hàng " to={config.routes.EditOrders} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Lịch sử" to={config.routes.History} />
                        </div>
                    </div>
                </Menu>
            </div>

            <div class="form">
                <div>
                    <h1 id="EditProfile1">Edit profile</h1>
                </div>
                <div class="tab-content">
                    <form id="EditProfile">
                        <p>
                            <medium id="UserName">User name *</medium>
                            <input
                                type="UserName"
                                class="form-control input-style"
                                id="exampleInputUserName"
                                aria-describedby="UserName"
                            />
                        </p>

                        <p>
                            <medium id="Email">Email address</medium>
                            <input
                                type="email"
                                class="form-control input-style"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                            <small id="emailHelp" class="form-text text-muted">
                                A valid e-mail address. All e-mails from the system will be sent to this address.
                            </small>
                        </p>
                        <p>
                            <medium id="Password">Password *</medium>
                            <input
                                type="Password"
                                class="form-control input-style"
                                id="exampleInputPassword"
                                aria-describedby="Password"
                            />
                        </p>

                        <div>
                            <button type="submit" class="button button-block">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditOrders;
