import config from '~/config';
import Menu, { MenuItem } from '../../Menu';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Create.css';
import axios from 'axios';

const cx = classNames.bind(styles);
export default function CreateProducts() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageCover, setImageCover] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const product = { title, author, description, imageTitle, imageCover };

        axios
            .post(`${process.env.REACT_APP_BASE_URLS}blog/create`, product)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Thêm blog thành công!`);
                } else {
                    toast.error(`Thêm blog không thành công!`);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thêm blog không thành công!`);
            });
    };
    return (
        <>
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
            <h1>Add Blog</h1>
            <ToastContainer />
            <div className="panel panel-primary dialog-panel">
                <div className="panel-heading">
                    <h4>Đăng blog</h4>
                </div>
                <div className="panel-body">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
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
                                <div className="col-md-4 indent-small">
                                    <div className="form-group internal">
                                        <input
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Nội dung Blog"
                                            type="text"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
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
                            <div className="col-md-offset-4 col-md-3">
                                <button className="btn-lg btn-primary" type="submit">
                                    Tải lên
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
