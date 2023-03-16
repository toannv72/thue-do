import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function Home() {
    // clik voo ddeer chayj anh
  
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
        return (
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
                   
                    <img
                        alt=""
                        src="https://raw.githubusercontent.com/toansola3/thue-do/master/img/328063220_619078163361298_6566497839462960659_n.jpg"
                    />
                    <img
                        alt=""
                        src="https://github.com/toansola3/thue-do/blob/master/img/333133513_1458268194700445_2870753470290308647_n.jpg?raw=true"
                    />
                    <img
                        alt=""
                        src="https://github.com/toansola3/thue-do/blob/master/img/329149838_558473532883494_2508217283299694150_n.jpg?raw=true"
                    />
                </Carousel>
            </div>
        );
    }
// }
