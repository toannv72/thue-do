import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';

import Category from '../Category/Category';
import Quote from '~/layouts/Footer/Footer';
import styles from '../Category/SanPham3.module.scss';
import classNames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
const cx = classNames.bind(styles);
export default function Jewelry() {
    return (
        <div>
            <div className={cx('toan')}>
                <Carousel
                    autoPlay={true}
                    interval={4000}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    autoFocus={true}
                    emulateTouch={true}
                    //chế độ trung tâm
                    // centerMode={true}
                >
                    {/* {items.map((item, index) => (
                        <div key={index}>
                            <img alt={index} src={item.img} />
                     
                        </div>
                    ))} */}
                    <img
                        alt=""
                        src="https://github.com/toansola3/thue-do/blob/master/img/TrangSuc1%20(1).png?raw=true"
                    />
                    <img
                        alt=""
                        src="https://github.com/toansola3/thue-do/blob/master/img/TrangSuc1%20(2).png?raw=true"
                    />
                    <img
                        alt=""
                        src="https://github.com/toansola3/thue-do/blob/master/img/TrangSuc1%20(3).png?raw=true"
                    />
                </Carousel>
            </div>
            <FeaturedTitle
                titles="Trang Sức"
                children={<Category url="2" />}
            />
            <Quote />
        </div>
    );
}
