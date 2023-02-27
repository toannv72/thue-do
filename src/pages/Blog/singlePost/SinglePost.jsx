import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '~/layouts/Footer';

import './singlePost.css';

export default function SinglePost() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('post:');
    const [lastPart, setLastPart] = useState(urlParts[urlParts.length - 1]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}blog/getOne/${lastPart}`)
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
            <div className="singlePost">
                <div className="singlePostWrapper">
                    <img className="singlePostImg" src={products.imageCover} alt="" />
                    <h1 className="singlePostTitle">
                        {products.title}
                        <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit"></i>
                            <i className="singlePostIcon far fa-trash-alt"></i>
                        </div>
                    </h1>
                    <div className="singlePostInfo">
                        <span style={{ display: 'flex' }}>
                            <h2> Author:</h2>
                            <h2 style={{ color:"black" }}>{products.author}</h2>
                        </span>
                       
                    </div>
                    <p className="singlePostDesc">{products.description}</p>
                </div>
                <Footer />
            </div>
        );
    }
}
