import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

export default function User() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
       const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
       const [productToDelete, setProductToDelete] = useState(null);
    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirmation(false);

        if (productToDelete) {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}users/remove/${productToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Xóa sản phẩm có id = ${productToDelete.id} thành công!`);
            } else {
                console.error(`Xóa sản phẩm có id = ${productToDelete.id} không thành công!`);
            }

            setProductToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setProductToDelete(null);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}users/${searchTerm}`);
            const data = await response.json();
            setSearchResults(data);
        };

        if (searchTerm !== '') {
            fetchSearchResults();
        }
    }, [searchTerm]);

    const handleInputChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchTerm(searchValue);
        }
    };

    return (
        <>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />

            <h1>Tìm kiếm người dùng</h1>

            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Tìm kiếm người dùng nào đó..."
                    aria-label="Search"
                />
            </form>
            <div className={cx('table')}>
                <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên tài khoản</th>
                            <th>Tên người dùng</th>
                            <th>Địa chỉ</th>
                            <th>Ảnh</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{result.username}</td>
                                <td>
                                    {result.lastName} {result.firstName}
                                </td>
                                <td>{result.address}</td>
                                <td>
                                    <img className={cx('img')} src={result.avatar} alt="" width="100px;" />
                                </td>

                                <td>{result.email}</td>

                                <td>{result.phone}</td>
                                <td>
                                    <span className="badge bg-success"> {result.status}</span>
                                </td>

                                <td>
                                    <div className={cx('delete')}>
                                        <button
                                            className=" btn-primary btn-sm "
                                            type="button"
                                            title="Khóa tài khoản"
                                            onClick={() => {
                                                handleDelete();
                                                setProductToDelete(result.id);
                                            }}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <div className={cx('edit')}>
                                        <button
                                            className=" btn-primary btn-sm "
                                            type="button"
                                            title="Sửa"
                                            id="show-emp"
                                            data-toggle="modal"
                                            data-target="#ModalUP"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showDeleteConfirmation && (
                <div className={cx('contact-container')}>
                    <div className="swal-modal" role="dialog" aria-modal="true">
                        <div className="swal-title">
                            <h1>Cảnh báo</h1>
                        </div>
                        <h2>Bạn có chắc chắn là muốn xóa sản phẩm này?</h2>
                        <div className={cx('swal-footer')}>
                            <button className={cx('button')} onClick={cancelDelete}>
                                Hủy bỏ
                            </button>

                            <button className={cx('button1')} onClick={confirmDelete}>
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
