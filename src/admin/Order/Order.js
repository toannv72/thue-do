import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorToast from '~/pages/Product/ErrorToast';
import './style.css';

export default function Order() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getAll?page=0&size=20&sort=desc`)
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
                    throw new Error(error.message);
                },
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error.message);
            });
    }, []);
    console.log(items);
    console.log(error);
    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
                />

                <h1> Order</h1>
                <div className="project-boxes jsGridView">
                    {items.map((item) => (
                        <div className="project-box-wrapper">
                            <div className="project-box">
                                <div className="project-box-header">
                                    <span>{item.orderDetails[0].orderBorrowDate}</span>
                                    <span>{item.orderDetails[0].orderReturnDate}</span>
                                    <div className="more-wrapper">
                                        <button className="project-btn-more">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="feather feather-more-vertical"
                                            >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="12" cy="5" r="1" />
                                                <circle cx="12" cy="19" r="1" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="project-box-content-header">
                                    <p className="box-content-header">{item.name}</p>
                                    <p className="box-content-subheader">Địa chỉ: {item.address}</p>
                                    <p className="box-content-subheader">SĐT{item.phone}</p>
                                    <p className="box-content-subheader">Lời nhắn: {item.message}</p>
                                    <p className="box-content-subheader">
                                        Số tiền thu:{item.totalPrice.toLocaleString('vi-VN')}đ
                                    </p>
                                </div>
                                <div className="box-progress-wrapper">
                                    <p className="box-progress-header">Progress</p>
                                    <div className="box-progress-bar">
                                        <span className="box-progress"></span>
                                    </div>
                                </div>
                                <div className="project-box-footer">
                                    <div className="participants">
                                        <button className="add-participant">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="3"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="feather feather-plus"
                                            >
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="days-left">2 Days Left</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination count={10} variant="outlined" shape="rounded" />
            </>
        );
    }
}
