import className from 'classnames/bind';
import styles from './Products.module.scss';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedTitle from '../FeaturedTitle/FeaturedTitle';
import SanPham3 from '../SanPham3';
export default function Products() {
    const cx = className.bind(styles);
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('products:');
    const lastPart = urlParts[urlParts.length - 1];


    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(products);
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
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {lastPart}

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
                                <img alt="" src={products.images[0].url} />
                                <img alt="" src={products.images[1].url} />
                                <img alt="" src={products.images[2].url} />
                            </Carousel>
                        </div>
                    </div>

                    <div className={cx('product-right')}>
                        <div className={cx('product-aa')}>
                            <div className={cx('product-name')}>{products.name}</div>

                            <div className={cx('information')}>
                                <div className={cx('Evaluates')}>
                                    <div className={cx('Mark')}>5.0</div>
                                    <div className={cx('Evaluate')}>
                                        <div className={cx('Mark')}>1</div>
                                        <div className={cx('nTpKes')}>đánh giá</div>
                                    </div>
                                    <div className={cx('sold')}>
                                        <div className={cx('Mark')}>{products.quantity}</div>
                                        <div className={cx('c8aTLs')}>đã thuê</div>
                                    </div>
                                </div>
                                <button className={cx('GyD5JO')}>Tố cáo</button>
                            </div>
                            <div className={cx('product-price')}>{products.price}</div>
                            <div className={cx('h-y3ij')}>{products.description}</div>
                            <div className={cx('p+UZsF')}>
                                <div className={cx('ThEIyI')}>
                                    <div className={cx('p+UZsF')}>
                                        <button className={cx('btn')} type="button">
                                            <span>thêm vào giỏ hàng</span>
                                        </button>
                                        <Link to={`/pay:${products.id}`}>
                                            <button className={cx('btn')} type="button" aria-disabled="false">
                                                Thuê ngay
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('FeaturedTitle')}>
                    <FeaturedTitle
                        titles="Sản phẩm liên quan"
                        children={<SanPham3 url="products/getAllProduct?page=0&size=20" />}
                    />
                </div>
            </div>
        );
    }
}
