import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    // faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    // faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
// import Image from '~/components/Image';
import Search from '../Search';
import { useEffect } from 'react';
import { useState } from 'react';
import tr from 'date-fns/esm/locale/tr/index.js';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    // {
    //     icon: <FontAwesomeIcon icon={faEarthAsia} />,
    //     title: 'English',
    //     children: {
    //         title: 'Language',
    //         data: [
    //             {
    //                 type: 'language',
    //                 code: 'en',
    //                 title: 'English',
    //             },
    //             {
    //                 type: 'language',
    //                 code: 'vi',
    //                 title: 'Tiếng Việt',
    //             },
    //         ],
    //     },
    // },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    // {
    //     icon: <FontAwesomeIcon icon={faKeyboard} />,
    //     title: 'Keyboard shortcuts',
    // },
];

function Header() {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [information, setInformation] = useState(0);

    // check dang nhap
    const currentUser = localStorage.getItem('user');
    const imgUser = JSON.parse(localStorage.getItem('user'));
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    useEffect(() => {
        handleRequest();
        
    });

    useEffect(() => {
        handleRequest1();

    });
    useEffect(() => {
        if (imgUser) {
            const user = JSON.parse(localStorage.getItem('user')).id;
            fetch(`${process.env.REACT_APP_BASE_URLS}cart-iteam/viewCart/${user}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        setItems(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        setError(error);
                    },
                );
        }
    }, []);
    useEffect(() => {
        if (imgUser) {
            const user = JSON.parse(localStorage.getItem('user')).id;
            fetch(`${process.env.REACT_APP_BASE_URLS}information/getCountIsReadByUser/${user}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        setInformation(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        setError(error);
                    },
                );
        }
    }, []);
    const handleRequest = debounce(() => {
        if (imgUser) {
            const user = JSON.parse(localStorage.getItem('user')).id;
            fetch(`${process.env.REACT_APP_BASE_URLS}cart-iteam/viewCart/${user}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        setItems(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        setError(error);
                    },
                );
        }
    }, 1000);

    const handleRequest1 = debounce(() => {
        if (imgUser) {
            const user = JSON.parse(localStorage.getItem('user')).id;
            fetch(`${process.env.REACT_APP_BASE_URLS}information/getCountIsReadByUser/${user}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        setInformation(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        setError(error);
                    },
                );
        }
    }, 1000);
    // console.log(items.product);
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Tài khoản',
            to: `/@${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : ""}`,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Cài đặt',
            to: '/information',
        },
        // ...MENU_ITEMS,

        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Link to={config.routes.shoppingCart}>
                                <Tippy delay={[0, 50]} content="Giỏ Hàng " placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                        <span className={cx('badge')}>{items.product ? items.product.length : 0}</span>
                                    </button>
                                </Tippy>
                            </Link>
                            {/* <Link to={config.routes.message}>
                                <Tippy delay={[0, 50]} content="Tin Nhắn" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </Link> */}
                            <Link to={config.routes.notification}>
                                <Tippy delay={[0, 50]} content="Thông báo" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>{information ? information : 0}</span>
                                        {/* {information ? <span className={cx('badge')}>{information}</span> : <></>} */}
                                    </button>
                                </Tippy>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/register'}>
                                <Button text>Đăng ký</Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button primary>Đăng Nhập</Button>
                            </Link>
                        </>
                    )}

                    {currentUser ? (
                        <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {currentUser ? (
                                <img
                                    className={cx('user-avatar')}
                                    src={imgUser.avatar ? imgUser.avatar : images.noImage}
                                    alt=""
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
