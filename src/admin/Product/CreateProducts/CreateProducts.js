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
const cx = classNames.bind(styles);
export default function CreateProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState();
    const [images1, setImages1] = useState('');
    const [images2, setImages2] = useState('');
    const [images3, setImages3] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const product = { name, description, price, images, category, deposit };

    //     axios
    //         .post(`${process.env.REACT_APP_BASE_URLS}products/create`, product)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 toast.success(`Thêm sản phẩm thành công!`);
    //             } else {
    //                 toast.error(`Thêm sản phẩm không thành công!`);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             toast.error(`Thêm sản phẩm không thành công!`);
    //         });
    // };
    const handleSubmit1 = () => {
        // event.preventDefault();
        const product = { name, description, price, images, category, deposit };

        axios
            .post(`${process.env.REACT_APP_BASE_URLS}products/create`, product)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Thêm sản phẩm thành công!`);
                } else {
                    toast.error(`Thêm sản phẩm không thành công!`);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thêm sản phẩm không thành công!`);
            });
      console.log(product);
    };
    const [img, setImg] = useState(null);

    const upImg = () => {

        if (img == null) return;
        const imagerRef = ref(storage, `images/${img.name + v4()}`);
        uploadBytes(imagerRef, img).then(() => {
            getDownloadURL(imagerRef).then((url) => {
                setImages([{ url: url }]);
                //    console.log(images); // Được thực thi khi state đã được cập nhật
                   console.log(url); // in ra đường dẫn của ảnh
         
            });
          
        });
    };
    useEffect(() => {
        if (images.length > 0) {
            handleSubmit1();
        }
    }, [images]);
    return (
        <>
            <Menu>
                <div className={cx('function')}>
                    <div className={cx('')}>
                        <MenuItem title="Thêm sản phẩm" to={config.routes.adminCreateProduct} />
                    </div>
                    <div className={cx('')}>
                        <MenuItem title="Quản lý sản phẩm " to={config.routes.adminProductManagement} />
                    </div>
                </div>
            </Menu>
            <h1>Add Product</h1>
            <ToastContainer />
            <div className="panel panel-primary dialog-panel">
                <div className="panel-heading">
                    <h4>Thêm Sản Phẩm</h4>
                </div>
                <div className="panel-body">
                    <form className="form-horizontal" onSubmit={upImg}>
                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_accomodation">
                                Loại hàng
                            </label>
                            <div className="col-md-2">
                                <select
                                    className="form-control"
                                    id="id_accomodation"
                                    onChange={(event) => setCategory({ id: event.target.value })}
                                >
                                    <option value="">--Chọn loại sản phẩm--</option>
                                    <option value="1">Quần áo</option>
                                    <option value="2">Trang sức</option>
                                    <option value="3">Công nghệ</option>
                                    <option value="4">Thể thao</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                Tên sảm phẩm
                            </label>
                            <div className="col-md-8">
                                <div className="col-md-8 indent-small">
                                    <div className="form-group internal">
                                        <input
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Tên sản phẩm"
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                Giá tiền
                            </label>
                            <div className="col-md-8">
                                <div className="col-md-4 indent-small">
                                    <div className="form-group internal">
                                        <input
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Giá tiền"
                                            type="text"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                Giá tiền đặt cọc sản phẩm
                            </label>
                            <div className="col-md-8">
                                <div className="col-md-4 indent-small">
                                    <div className="form-group internal">
                                        <input
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Đặt cọc"
                                            type="text"
                                            value={deposit}
                                            onChange={(event) => setDeposit(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                Ảnh sản phẩm
                            </label>
                            <div className="col-md-8">
                                <div className="col-md-2 indent-small">
                                    <div className="form-group internal">
                                        <input
                                            className="form-control"
                                            id="id_last_name"
                                            placeholder="Ảnh 3"
                                            type="file"
                                            onChange={(event) => setImg(event.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_comments">
                                Miêu tả sản phẩm
                            </label>
                            <div className="col-md-6">
                                <textarea
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="form-control"
                                    id="id_comments"
                                    placeholder="Miêu tả"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <div className="col-md-offset-4 col-md-3">
                                <button className="btn-lg btn-primary" type="submit">
                                    Thêm sản phẩm
                                </button>
                            </div>
                        </div> */}
                    </form>
                    {/* <button onClick={upImg}>toan</button> */}
                    <div className="form-group">
                        <div className="col-md-offset-4 col-md-3">
                            <button className="btn-lg btn-primary" onClick={upImg} >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
