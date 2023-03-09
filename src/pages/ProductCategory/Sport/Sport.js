import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';

import Quote from '~/layouts/Footer/Footer';
import Category from '../Category/Category';
import styles from '../Category/SanPham3.module.scss';
import classNames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
const cx = classNames.bind(styles);
export default function Sport() {
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
                    <img alt="" src="https://github.com/toansola3/thue-do/blob/master/img/TheThao%20(1).png?raw=true" />
                    <img alt="" src="https://github.com/toansola3/thue-do/blob/master/img/TheThao%20(2).png?raw=true" />
                    <img alt="" src="https://github.com/toansola3/thue-do/blob/master/img/TheThao%20(3).png?raw=true" />
                </Carousel>
            </div>
            <FeaturedTitle
                titles="Thể Thao"
                children={<Category url="4" />}
            />
            <Quote />
        </div>
    );
}
