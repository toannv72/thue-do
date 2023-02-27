import config from '~/config';
import Menu, { MenuItem } from '../../Menu';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
export default function CreateProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageCover, setImageCover] = useState('');
    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteConfirmation(true);
    };
    const handleEdit = () => {
        setShowEditConfirmation(true);
    };
    const confirmDelete = async () => {
        setShowDeleteConfirmation(false);

        if (productToDelete) {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}blog/remove/${productToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(`Xóa sản phẩm thành công!`);
            } else {
                toast.error(`Xóa sản phẩm không thành công!`);
            }

            setProductToDelete(null);
        }
    };

    const confirmEdit = (event) => {
        event.preventDefault();
        const updatedProduct = {
            id: productToEdit,
            title: title,
            author: author,
            description: description,
            imageTitle: imageTitle,
            imageCover: imageCover,
        };

        axios
            .put(`${process.env.REACT_APP_BASE_URLS}blog/update`, updatedProduct)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Thay đổi sản phẩm thành công!`);
                } else {
                    toast.error(`Thay đổi sản phẩm không thành công!`);
                }
                setShowEditConfirmation(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thay đổi sản phẩm không thành công!`);
            });
    };
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setProductToDelete(null);
    };
    const cancelEdit = () => {
        setShowEditConfirmation(false);
        setProductToEdit(null);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}blog/${searchTerm}`);
            const data = await response.json();
            setSearchResults(data);
        };

        if (searchTerm !== '') {
            fetchSearchResults();
        }
    }, [searchTerm, productToDelete, productToEdit, showEditConfirmation]);

    const handleInputChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchTerm(searchValue);
        }
    };

    return (
        <>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />

            <Menu>
                <div className={cx('function')}>
                    <div className={cx('')}>
                        <MenuItem title="Đăng blog" to={config.routes.adminCreateBlog} />
                    </div>
                    <div className={cx('')}>
                        <MenuItem title="Quản lý blog " to={config.routes.adminBlogManagement} />
                    </div>
                </div>
            </Menu>
            <h1>Tìm kiếm blog</h1>

            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Tìm kiếm món đồ nào đó..."
                    aria-label="Search"
                />
            </form>
            <div className={cx('table')}>
                <ToastContainer />
                <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã Blog</th>
                            <th>Tên Blog</th>
                            <th>Ảnh</th>
                            <th>Ảnh bìa</th>
                            <th>Tác giả</th>
                            <th>Nội dung</th>
                            <th>Thời gian đăng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{result.id}</td>
                                <td>{result.title}</td>
                                <td>
                                    <Image className={cx('img')} src={result.imageTitle} alt="" width="100px;" />
                                </td>
                                <td>
                                    <Image className={cx('img')} src={result.imageCover} alt="" width="100px;" />
                                </td>
                                <td>{result.author}</td>
                                <td>{result.description}</td>
                                <td>{result.createdDate}</td>
                                <td>
                                    <div className={cx('delete')}>
                                        <button
                                            className=" btn-primary btn-sm "
                                            type="button"
                                            title="Xóa"
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
                                            onClick={() => {
                                                setProductToEdit(result.id);
                                                handleEdit();
                                            }}
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

            {showEditConfirmation && (
                <div className={cx('contact-container1')}>
                    <div className="panel panel-primary dialog-panel">
                        <div className="panel-heading">
                            <h4>Thêm Sản Phẩm</h4>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Tiêu đề
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-8 indent-small">
                                            <div className="form-group internal">
                                                <input
                                                    className="form-control"
                                                    id="id_last_name"
                                                    placeholder="Tiêu đề"
                                                    type="text"
                                                    value={title}
                                                    onChange={(event) => setTitle(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Tác giả
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-4 indent-small">
                                            <div className="form-group internal">
                                                <input
                                                    className="form-control"
                                                    id="id_last_name"
                                                    placeholder="Tác giả"
                                                    type="text"
                                                    value={author}
                                                    onChange={(event) => setAuthor(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Nội dung
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-8 indent-small">
                                            <div className="form-group internal">
                                                {/* <textarea
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Nội dung Blog"
                                            type="text"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        /> */}
                                                <textarea
                                                    onChange={(event) => setDescription(event.target.value)}
                                                    className="form-control"
                                                    id="id_comments"
                                                    placeholder="Nội dung Blog"
                                                    rows="5"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Ảnh tiêu đề
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-4 indent-small">
                                            <div className="form-group internal">
                                                <input
                                                    className="form-control"
                                                    id="id_last_name"
                                                    placeholder="Ảnh tiêu đề"
                                                    type="text"
                                                    value={imageTitle}
                                                    onChange={(event) => setImageTitle(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Ảnh bìa
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-4 indent-small">
                                            <div className="form-group internal">
                                                <input
                                                    className="form-control"
                                                    id="id_last_name"
                                                    placeholder=" Ảnh bìa"
                                                    type="text"
                                                    value={imageCover}
                                                    onChange={(event) => setImageCover(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-offset-1 col-md-12">
                                        <button
                                            className="btn-lg btn-primary"
                                            style={{ marginLeft: 100, marginRight: 100, background: 'red' }}
                                            type="submit"
                                            onClick={confirmEdit}
                                        >
                                            Thay đổi
                                        </button>
                                        <button className="btn-lg btn-primary" type="submit" onClick={cancelEdit}>
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
