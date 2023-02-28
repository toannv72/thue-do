import styles from './SanPham3.module.scss';
import classNames from 'classnames/bind';
import Splitting from 'splitting';
import { useEffect, useState } from 'react';

import ErrorToast from './ErrorToast';
import Image from '~/components/Image';

Splitting();
const cx = classNames.bind(styles);

function SanPham3({ url }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}${url}`)
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
    }, []);

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
                    {items.map((item, index) => (
                        <div className={cx('container')} key={index}>
                            <a href={`/products:${item.id}`}>
                                <div className={cx('to')}>
                                    {/* <img src={item.images[1] ? item.images[1].url : ''} alt="" srcSet="" /> */}
                                    {item.images.map((item, indexs) =>
                                        indexs === 0 ? <Image alt="" src={item.url} key={indexs} /> : <div key={indexs}></div>,
                                    )}
                                </div>

                                <div className={cx('container__profile')}>
                                    <div className={cx('container__profile__text')}>
                                        <h2>{item.name}</h2>
                                        <h4>{item.price ? item.price.toLocaleString('vi-VN') : ''}đ</h4>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SanPham3;
