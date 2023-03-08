import className from 'classnames/bind';
import styles from './Products.module.scss';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedTitle from '../FeaturedTitle/FeaturedTitle';

import Image from '~/components/Image';
import Category from '~/pages/ProductCategory/Category/Category';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function Products() {
    const cx = className.bind(styles);
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('products:');
    const lastPart=urlParts[urlParts.length - 1];
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = localStorage.getItem('user');
   

    // console.log(user);
    const createUser = () => {
        const product = { id: lastPart };
        const user = { id: JSON.parse(localStorage.getItem('user')).id };
        const products = { product, user };
        axios
            .post(`${process.env.REACT_APP_BASE_URLS}cart-iteam/create`, products)
            .then((response) => {
                toast.success(`Thêm vào giỏ thành công!`);
              
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data.message}`);
            });
           
        };
        
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}products/getOne/${lastPart}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
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
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {products ? (
                    <div>
                        <ToastContainer />
                        <div className={cx('product')}>
                            <div className={cx('product-left')}>
                                <div className={cx('product-left-img')}>
                                    <Carousel
                                        // autoPlay={true}
                                        interval={4000}
                                        autoPlay={true}
                                        showThumbs={false}
                                        showStatus={false}
                                        infiniteLoop={true}
                                        autoFocus={true}
                                        emulateTouch={true}
                                        //chế độ trung tâm
                                        // centerMode={true}
                                    >
                                        {/* <img alt="" src={products.images[0] ? products.images[0].url : null} />
                                        <img alt="" src={products.images[1] ? products.images[1].url : null} />
                                        <img alt="" src={products.images[2] ? products.images[2].url : null} /> */}
                                        {products.images.map((item, index) => (
                                            <Image alt="" src={item.url} key={index} />
                                        ))}
                                    </Carousel>
                                </div>
                            </div>

                            <div className={cx('product-right')}>
                                <div className={cx('product-aa')}>
                                    <div className={cx('product-name')}>{products.name}</div>

                                    <div className={cx('information')}>
                                        <div className={cx('Evaluates')}>
                                            {/* <div className={cx('sold')}>
                                            <div className={cx('Mark')}>{products.quantity}</div>
                                            <div className={cx('c8aTLs')}>đã thuê</div>
                                        </div> */}
                                        </div>
                                        <button className={cx('GyD5JO')}>Báo cáo</button>
                                    </div>
                                    <div className={cx('product-price')}>
                                        {products.price.toLocaleString('vi-VN')} đ/ngày
                                    </div>
                                    <div className={cx('h-y3ij')}>{products.description}</div>
                                    <div className={cx('p+UZsF')}>
                                        <div className={cx('ThEIyI')}>
                                            {currentUser ? (
                                                <div className={cx('p+UZsF')}>
                                                    <button className={cx('btn')} type="button" onClick={createUser}>
                                                        <span>Thêm vào giỏ hàng</span>
                                                    </button>
                                                    <Link to={`/pay:${products.id}`}>
                                                        <button
                                                            className={cx('btn')}
                                                            type="button"
                                                            aria-disabled="false"
                                                        >
                                                            Thuê ngay
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className={cx('p+UZsF')}>
                                                    <a href={`/login`} target="_blank">
                                                        <button
                                                            className={cx('btn')}
                                                            type="button"
                                                            onClick={createUser}
                                                        >
                                                            <span>Thêm vào giỏ hàng</span>
                                                        </button>
                                                    </a>
                                                    <a href={`/login`} target="_blank">
                                                        <button
                                                            className={cx('btn')}
                                                            type="button"
                                                            aria-disabled="false"
                                                        >
                                                            Thuê ngay
                                                        </button>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('FeaturedTitle')}>
                            <FeaturedTitle
                                titles="Sản phẩm liên quan"
                                children={<Category url={`categories/getOne/${products.category.id}`} />}
                            />
                        </div>
                    </div>
                ) : (
                    <p>Sản phẩm này chưa có</p>
                )}
            </div>
        );
    }
}
