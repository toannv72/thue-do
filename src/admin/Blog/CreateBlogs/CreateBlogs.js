import config from '~/config';
import Menu, { MenuItem } from '../../Menu';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Create.css';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/configs/firebase';
import { v4 } from 'uuid';
import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);
export default function CreateProducts() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState(EditorState.createEmpty());
    const [imageTitle, setImageTitle] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [circular, setCircular] = useState(false);

    const [toan, setToan] = useState(false);
    const handleSubmit = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URLS}blog/create`, {
                title,
                author,
                description: draftToHtml(convertToRaw(description.getCurrentContent())),
                imageTitle,
                imageCover,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(imageTitle, imageCover);
                    setCircular(false);

                    toast.success(`Thêm blog thành công!`);
                } else {
                    setCircular(false);

                    toast.error(`Thêm blog không thành công!`);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thêm blog không thành công!`);
            });
        setToan(false);
    };
    const [img, setImg] = useState(null);
    const [img1, setImg1] = useState(null);

    const upImg = () => {
        // if (img == null && img1 == null) return;
        
        // console.log(category.id);
        if (img == null || img1 == null || title === '' || author === '' || description === '') {
            return toast.error(`vui lòng nhập đầy đủ thông tin !`);
        }
        setCircular(true);

        const urls = [];
        const urls1 = [];

        for (let index = 0; index < img.length; index++) {
            const imagerRef = ref(storage, `images/${img[index].name + v4()}`);
            // eslint-disable-next-line no-loop-func
            uploadBytes(imagerRef, img[index]).then(() => {
                getDownloadURL(imagerRef).then((url) => {
                    urls.push({ url: url });
                    if (img.length === urls.length) {
                        setImageTitle(url);
                        for (let index = 0; index < img1.length; index++) {
                            const imagerRef = ref(storage, `images/${img1[index].name + v4()}`);
                            // eslint-disable-next-line no-loop-func
                            uploadBytes(imagerRef, img1[index]).then(() => {
                                getDownloadURL(imagerRef).then((url) => {
                                    urls1.push({ url: url });
                                    if (img1.length === urls1.length) {
                                        setImageCover(url);
                                        setToan(true);
                                    }
                                });
                            });
                        }
                    }
                });
            });
        }

        // setImages(urls);
    };

    // console.log(images);
    useEffect(() => {
        if (toan) {
            handleSubmit();
            // console.log('toan');
        }
    }, [toan]);
    function onEditorStateChange(editorState) {
        setDescription(editorState);
    }
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
                                            onChange={(event) =>
                                                !event.target.value.startsWith(' ') ? (
                                                    setTitle(event.target.value)
                                                ) : (
                                                    <></>
                                                )
                                            }
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
                                            onChange={(event) =>!event.target.value.startsWith(' ') ? (
                                                    setAuthor(event.target.value)
                                                ) : (
                                                    <></>
                                                ) }
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
                                      
                                        <div style={{ backgroundColor: '#fff' }}>
                                            <Editor
                                                editorState={description}
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor"
                                                onEditorStateChange={onEditorStateChange}
                                                placeholder="Nội dung Blog"
                                            />
                                        </div>
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
                                            placeholder="Ảnh 3"
                                            type="file"
                                            onChange={(e) => {
                                                setImg(e.target.files);
                                            }}
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
                                            placeholder="Ảnh 3"
                                            type="file"
                                            onChange={(e) => {
                                                setImg1(e.target.files);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {circular && (
                        <>
                            <CircularProgress color="secondary" />
                        </>
                    )}
                    <div className="form-group">
                        <div className="col-md-offset-4 col-md-3">
                            <button className="btn-lg btn-primary" onClick={upImg}>
                                Tải lên
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
