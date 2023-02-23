import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function Home() {
    // clik voo ddeer chayj anh
    function toan(key) {
        items.map((item, index) => {
            if (key === index) {
                console.log(item.img);
                return (window.location = '/blog');
            }
            return item.img;
        });
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    // console.log(localStorage.getItem('email'));
    // console.log(localStorage.getItem('password'));
    // console.log(localStorage.getItem('token'));
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch('http://localhost:3000/Responsive')
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
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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
                    onClickItem={toan}
                >
                    {items.map((item, index) => (
                        <div key={index}>
                            <img alt={index} src={item.img} />
                     
                        </div>
                    ))}
                </Carousel>

            </div>
        );
    }
}
