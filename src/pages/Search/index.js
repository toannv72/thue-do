import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SanPham3 from '../Product/SanPham3';
import ErrorToast from '../Product/ErrorToast';
import FeaturedTitle from '../Product/FeaturedTitle/FeaturedTitle';

function Search() {
    const cx = classNames.bind(styles);
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('search:');
    // const [lastPart, setLastPart] = useState(urlParts[urlParts.length - 1]);
    const lastPart= urlParts[urlParts.length - 1];
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { pathname } = useLocation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}products/${lastPart}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [lastPart]);

    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className={cx('card')}>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
                        integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
                        crossOrigin="anonymous"
                    />
                    {items[0] ? (
                        items.map((item, index) => (
                            <a href={`/products:${item.id}`} key={index}>
                                <div className={cx('container')}>
                                    <div className={cx('to')}>
                                        <img src={item.images[0] ? item.images[0].url : ''} alt="" srcSet="" />
                                    </div>

                                    <div className={cx('container__profile')}>
                                        <div className={cx('container__profile__text')}>
                                            <h2>{item.name}</h2>
                                            <h4>{item.price ? item.price.toLocaleString('vi-VN') : ''}đ</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div>không tìm thấy sản phẩm</div>
                    )}
                    <FeaturedTitle
                        titles="Các sản phẩm khác"
                        children={<SanPham3 url="products/getAllProduct?page=0&size=20" />}
                    />
                </div>
            </div>
        );
    }
}

export default Search;
