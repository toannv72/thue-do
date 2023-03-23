import './Profile.css';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { v4 } from 'uuid';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/configs/firebase';
import { useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import { useRef } from 'react';
const cx = classNames.bind(styles);
function Profile() {
    // const id = localStorage.getItem('username');
    const User = JSON.parse(localStorage.getItem('user'));
    const [imageUrl, setImageUrl] = useState('');
    const [avatar, setAvatar] = useState('');
    const [showEditAvatar, setShowEditAvatar] = useState(false);
    const [showEditAvatar1, setShowEditAvatar1] = useState(false);
    const inputFileRef = useRef(null);
    const inputFileRef1 = useRef(null);
    const cancel = () => {
        setShowEditAvatar(false);
        setShowEditAvatar1(false);
        setSelectedImg(null);
        inputFileRef.current.value = null;
    };
 const cancel1 = () => {
     setShowEditAvatar(false);
     setShowEditAvatar1(false);
     setSelectedImg1(null);
     inputFileRef1.current.value = null;
 };

    function ChangePhoto() {
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}users/update`, {
                id: User.id,
                imageUrl: imageUrl,
            })
            .then((response) => {
                if (response.status === 200) {
                    //  toast.success(`Thay đổi sản phẩm thành công!`);
                } else {
                    //  toast.error(`Thay đổi sản phẩm không thành công!`);
                }
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log(response.data);
                setToan(false);
            })
            .catch((error) => {
                console.log(error);
                setToan(false);
            });
        cancel();
    }
 function ChangePhoto1() {
     axios
         .put(`${process.env.REACT_APP_BASE_URLS}users/update`, {
             id: User.id,
             
             avatar: avatar, 
         })
         .then((response) => {
             if (response.status === 200) {
                 //  toast.success(`Thay đổi sản phẩm thành công!`);
             } else {
                 //  toast.error(`Thay đổi sản phẩm không thành công!`);
             }
             localStorage.setItem('user', JSON.stringify(response.data));
             console.log(response.data);
             setToan1(false);
         })
         .catch((error) => {
             console.log(error);
             setToan1(false);
         });
     cancel();
 }
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedImg1, setSelectedImg1] = useState(null);
    const [img, setImg] = useState(null);
    const [img1, setImg1] = useState(null);
    const [images, setImages] = useState([]);
    const [toan, setToan] = useState(false);
    const [toan1, setToan1] = useState(false);

    const upImg = () => {
        const urls = [];

        for (let index = 0; index < img.length; index++) {
            const imagerRef = ref(storage, `images/${img[index].name + v4()}`);
            uploadBytes(imagerRef, img[index]).then(() => {
                getDownloadURL(imagerRef).then((url) => {
                    urls.push({ url: url, name: `abc${index + 2}` });
                    if (img.length === urls.length) {
                        setImageUrl(url);
                        setToan(true);
                    }
                });
            });
        }
        // setImages(urls);
    };
     const upImg1 = () => {
         const urls = [];

         for (let index = 0; index < img1.length; index++) {
             const imagerRef = ref(storage, `images/${img1[index].name + v4()}`);
             uploadBytes(imagerRef, img1[index]).then(() => {
                 getDownloadURL(imagerRef).then((url) => {
                     urls.push({ url: url, name: `abc${index + 2}` });
                     if (img1.length === urls.length) {
                         setAvatar(url);
                         setToan1(true);
                     }
                 });
             });
         }
         // setImages(urls);
    };
    useEffect(() => {
        if (toan1) {
            ChangePhoto1();
            // console.log('toan');
        }
    }, [toan1]);
    useEffect(() => {
        if (toan) {
            ChangePhoto();
            // console.log('toan');
        }
    }, [toan]);
    return (
        <div>
            <div className="back-to-top" style={{ display: 'block', opacity: 1 }}></div>
            <div>
                <div className="user-header-wrapper">
                    <div className="user-header-inner flexbox">
                        <div className="user-header-overlay"></div>
                        <img
                            className="user-header"
                            src={User.imageUrl ? User.imageUrl : images.noImage1}
                            alt=""
                        />
                    </div>
                    <div className="user-info-bar">
                        <div className="ufo-bar-col3">
                            <div className=" user-icon-svg">
                                <button
                                    className={cx('button_img')}
                                    variant="contained"
                                    component="label"
                                    onClick={() => setShowEditAvatar(true)}
                                >
                                    <i data-visualcompletion="css-img" className={cx('xep6ejk')}></i>
                                    Thêm ảnh bìa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-info-bar">
                    <div className="ufo-bar-col1"></div>
                    <div className="ufo-bar-col2">
                        <div className="ufo-bar-col2-inner">
                            <div className="user-icon-wrapper">
                                <img
                                    className="user-icon"
                                    src={User.avatar ? User.avatar : images.noImage}
                                    alt=""
                                />
                                <i
                                    data-visualcompletion="css-img"
                                    className={cx('xep6ejk1')}
                                    onClick={() => setShowEditAvatar1(true)}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col3">
                        <div className="ufo-bar-col3-inner">
                            <div className="username-wrapper-outer">
                                <div className="username-wrapper">
                                    <h3 className="username-dev">
                                        {!User.firstName
                                            ? User.username
                                            : `${User.firstName} ${User.lastName}`}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ufo-bar-col5"></div>
                </div>

                <Menu>
                    <div className={cx('function')}>
                        <div className={cx('')}>
                            <MenuItem title="Đơn đặt hàng" to={config.routes.EditOrders} />
                        </div>
                        <div className={cx('')}>
                            <MenuItem title="Lịch sử" to={config.routes.History} />
                        </div>
                    </div>
                </Menu>
            </div>
            <Dialog
                maxWidth={1100}
                // maxHeight={800}
                open={showEditAvatar}
                // TransitionComponent={Transition}
                keepMounted
                onClose={cancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <div>
                        <div role="dialog" aria-modal="true">
                            {selectedImg && <img src={selectedImg} alt="Selected Image" style={{ maxWidth: 700 }} />}
                            <div className="">
                                <input
                                    className="form-control"
                                    id="id_last_name"
                                    placeholder="Ảnh 3"
                                    type="file"
                                    ref={inputFileRef}
                                    onChange={(e) => {
                                        setImg(e.target.files);
                                        setSelectedImg(URL.createObjectURL(e.target.files[0]));
                                    }}
                                />
                            </div>

                            <div className={cx('swal-footer')}>
                                {!selectedImg && (
                                    <Button onClick={cancel} style={{ background: '#0de667', color: 'white' }}>
                                        Hủy bỏ
                                    </Button>
                                )}
                                {selectedImg && (
                                    <>
                                        <Button
                                            onClick={() => {
                                                cancel();
                                                setSelectedImg(null);
                                                inputFileRef.current.value = null;
                                            }}
                                            style={{ background: '#0de667', color: 'white' }}
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                upImg();
                                            }}
                                            style={{
                                                marginLeft: 100,
                                                marginRight: 100,
                                                background: 'red',
                                                color: 'white',
                                            }}
                                        >
                                            Thay đổi
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
            <Dialog
                maxWidth={1100}
                // maxHeight={800}
                open={showEditAvatar1}
                // TransitionComponent={Transition}
                keepMounted
                onClose={cancel1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <div>
                        <div role="dialog" aria-modal="true">
                            {selectedImg1 && <img src={selectedImg1} alt="Selected Image" style={{ maxWidth: 700 }} />}
                            <div className="">
                                <input
                                    className="form-control"
                                    id="id_last_name"
                                    placeholder="Ảnh 3"
                                    type="file"
                                    ref={inputFileRef1}
                                    onChange={(e) => {
                                        setImg1(e.target.files);
                                        setSelectedImg1(URL.createObjectURL(e.target.files[0]));
                                    }}
                                />
                            </div>

                            <div className={cx('swal-footer')}>
                                {!selectedImg1 && (
                                    <Button onClick={cancel1} style={{ background: '#0de667', color: 'white' }}>
                                        Hủy bỏ
                                    </Button>
                                )}
                                {selectedImg1 && (
                                    <>
                                        <Button
                                            onClick={() => {
                                                cancel1();
                                                setSelectedImg1(null);
                                                inputFileRef1.current.value = null;
                                            }}
                                            style={{ background: '#0de667', color: 'white' }}
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                upImg1();
                                            }}
                                            style={{
                                                marginLeft: 100,
                                                marginRight: 100,
                                                background: 'red',
                                                color: 'white',
                                            }}
                                        >
                                            Thay đổi
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Profile;
