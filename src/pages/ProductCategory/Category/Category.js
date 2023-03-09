import styles from './SanPham3.module.scss';
import classNames from 'classnames/bind';
import Splitting from 'splitting';
import { useEffect, useState } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';
import Image from '~/components/Image';
import { Pagination } from '@mui/material';

Splitting();
const cx = classNames.bind(styles);

function Category({ url }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log(value);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}categories/getOne/${url}?page=${currentPage-1}&size=10&sort=id%2Cdesc`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    setTotalPage(result.pageProducts.totalPage);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [currentPage]);

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
                    {items.pageProducts.contends.map((item, index) => (
                        <div className={cx('container')} key={index}>
                            <a href={`/products:${item.id}`}>
                                <div className={cx('to')}>
                                    {item.images.map((item, indexs) =>
                                        indexs === 0 ? (
                                            <Image alt="" src={item.url} key={indexs} />
                                        ) : (
                                            <div key={indexs}></div>
                                        ),
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
                <Pagination
                    count={totalPage}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        );
    }
}

export default Category;
