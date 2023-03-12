import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';
import Post from '../post/Post';
import './posts.css';

export default function Posts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        window.scrollTo(0, 0);
        setCurrentPage(value);

        // console.log(value);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}blog/getAllBlog?page=${currentPage - 1}&size=6&sort=id%2Cdesc`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result);
                    setTotalPage(result.totalPage);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    throw new Error(error.message);
                },
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error.message);
            });
    }, [currentPage]);
    console.log(items);
    console.log(error);
    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className="posts" style={{ flexWraprap: 'wrap', justifyContent: 'center' }}>
                    {!items.error ? (
                        <>
                            {items.contends.map((item) => (
                                <>
                                    <Post
                                        key={item.id}
                                        title={item.title}
                                        img={item.imageTitle}
                                        writing={item.description}
                                        id={item.id}
                                    />
                                </>
                            ))}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            ></div>
                        </>
                    ) : (
                        <h1>không có blog</h1>
                    )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </>
        );
    }
}
