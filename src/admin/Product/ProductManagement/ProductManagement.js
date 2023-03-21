import config from '~/config';
import Menu, { MenuItem } from '../../Menu';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/configs/firebase';
import { v4 } from 'uuid';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';

const cx = classNames.bind(styles);
export default function CreateProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [deposit, setDeposit] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();

    const [images, setImages] = useState([]);
    const [toan, setToan] = useState(false);

    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        window.scrollTo(0, 0);
        setCurrentPage(value);

        // console.log(value);
    };
    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteConfirmation(true);
    };
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setProductToDelete(null);
        
    };
    const handleEdit = () => {
        setShowEditConfirmation(true);
        setShowDeleteConfirmation(false)
    };
    const cancelEdit = () => {
        setShowEditConfirmation(false);
        setProductToEdit(null);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirmation(false);
       
        if (productToDelete) {
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}products/remove/${productToDelete}`, {
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

    const confirmEdit = () => {
        // const updatedProduct = {
        //     id: productToEdit,
        //     name: name,
        //     status: status,
        //     description: draftToHtml(convertToRaw(description.getCurrentContent())),
        //     price: price,
        //     deposit: deposit,
        //     category: { id: category },
        //     images: images,
        // };
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}products/update`, {
                id: productToEdit,
                name: name,
                // status: status,
                description: draftToHtml(convertToRaw(description.getCurrentContent())),
                price: price,
                deposit: deposit,
                category: { id: category },
                images: images,
            })
            .then((response) => {
                if (response.status === 200) {
                   console.log(images);
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
        setToan(false);
    };

    function onEditorStateChange(editorState) {
        setDescription(editorState);
    }
    useEffect(() => {
        if (toan) {
            confirmEdit();
        }
    }, [toan]);
    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URLS}products/page/${searchTerm}?page=${currentPage - 1}&size=10`,
            );
            const data = await response.json();
            setSearchResults(data.contends);
            setTotalPage(data.totalPage);
        };

        if (searchTerm !== '') {
            fetchSearchResults();
        }
    }, [searchTerm, productToDelete, currentPage, showEditConfirmation]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URLS}products/getAllProduct?page=${
                    currentPage - 1
                }&size=10&sort=id%2Cdesc`,
            );
            const data = await response.json();
            setSearchResults(data.contends);
            setTotalPage(data.totalPage);
        };

        if (searchTerm === '') {
            fetchSearchResults();
        }
    }, [searchTerm, productToDelete, currentPage, showEditConfirmation]);
    const handleInputChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchTerm(searchValue);
            setCurrentPage(1);
        }
    };
    const [img, setImg] = useState(null);

    const upImg = () => {
        if (img == null) {
            setToan(true);
        }
        const urls = [];
        for (let index = 0; index < img.length; index++) {
            const imagerRef = ref(storage, `images/${img[index].name + v4()}`);
            uploadBytes(imagerRef, img[index]).then(() => {
                getDownloadURL(imagerRef).then((url) => {
                    // setImages([...images, { url: url }]);
                    urls.push({ url: url });
                    //    console.log(images); // Được thực thi khi state đã được cập nhật
                    // console.log(url); // in ra đường dẫn của ảnh
                    if (img.length === urls.length) {
                        setImages(urls);
                        setToan(true);
                    }
                });
            });
        }
    };
    return (
        <>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />

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
            <h1>Tìm kiếm sản phẩm</h1>

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
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Tình trạng</th>
                            <th>Giá tiền</th>
                            <th>Đặt cọc</th>
                            <th>Danh mục</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{result.id}</td>
                                <td>{result.name}</td>
                                <td>
                                    <img className={cx('img')} src={result.images[0].url} alt="" width="100px;" />
                                </td>

                                <td>
                                    <span className="badge bg-success">{result.status}</span>
                                </td>
                                <td>{result.price.toLocaleString('vi-VN')}đ</td>
                                <td>{result.deposit.toLocaleString('vi-VN')}đ</td>
                                <td>{result.category.name}</td>
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

                                                setStatus(result.author);
                                                setPrice(result.price);
                                                setDeposit(result.deposit);
                                                setName(result.name);

                                                setCategory(result.category.id);
                                                setStatus(result.status);

                                                const plainTextDescription = DOMPurify.sanitize(result.description, {
                                                    ALLOWED_TAGS: [],
                                                });
                                                setDescription(
                                                    EditorState.createWithContent(
                                                        ContentState.createFromText(plainTextDescription),
                                                    ),
                                                );
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
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>

            <div>
                {showDeleteConfirmation ? (
                    <Dialog
                        maxWidth={1100}
                        // maxHeight={800}
                        open={showDeleteConfirmation}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={cancelDelete}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogActions>
                            <div>
                                <div role="dialog" aria-modal="true">
                                    <div className="">
                                        <h1>Cảnh báo</h1>
                                    </div>
                                    <h2>Bạn có chắc chắn là muốn xóa sản phẩm này?</h2>

                                    <div className={cx('swal-footer')} style={{ display: 'flex' }}>
                                        <div>
                                            <Button
                                                onClick={cancelDelete}
                                                style={{ background: '#0de667', color: 'white' }}
                                            >
                                                Hủy bỏ
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    confirmDelete();
                                                }}
                                                style={{
                                                    background: 'red',
                                                    color: 'white',

                                                    marginRight: 100,
                                                }}
                                            >
                                                Đồng ý
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogActions>
                    </Dialog>
                ) : (
                    <></>
                )}
            </div>
            <div>
                {showEditConfirmation ? (
                    <Dialog
                        maxWidth={1100}
                        // maxHeight={800}
                        open={showEditConfirmation}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={cancelEdit}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogActions>
                            <div>
                                <div className="panel panel-primary dialog-panel">
                                    <div className="panel-heading">
                                        <h4>Thay đổi thông tin sản phẩm</h4>
                                    </div>
                                    <div className="panel-body">
                                        <form className="form-horizontal">
                                            <div className="form-group">
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_title"
                                                >
                                                    Loại hàng
                                                </label>
                                                <div className="col-md-2">
                                                    <select
                                                        className="form-control"
                                                        id="id_accomodation"
                                                        onChange={(event) => setCategory(event.target.value)}
                                                    >
                                                        <option value="">--Chọn loại sản phẩm--</option>
                                                        <option value="1">Nhạc Cụ</option>
                                                        <option value="2">Trang sức</option>
                                                        <option value="3">Công nghệ</option>
                                                        <option value="4">Thể thao</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_accomodation"
                                                >
                                                    Trạng thái
                                                </label>
                                                <div className="col-md-3">
                                                    <select
                                                        className="form-control"
                                                        id="id_accomodation"
                                                        onChange={(event) => setStatus(event.target.value)}
                                                    >
                                                        <option value="">--Chọn trạng thái sản phẩm--</option>
                                                        <option value="APPROVED">APPROVED</option>
                                                        <option value="RENTING">RENTING</option>
                                                        <option value="REJECTED">REJECTED</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            <div className="form-group">
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_title"
                                                >
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
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_title"
                                                >
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
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_title"
                                                >
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
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_title"
                                                >
                                                    Ảnh sản phẩm
                                                </label>
                                                <div className="col-md-8">
                                                    <div className="col-md-3 indent-small">
                                                        <div className="form-group internal">
                                                            <input
                                                                className="form-control"
                                                                id="id_last_name"
                                                                placeholder="Ảnh 3"
                                                                type="file"
                                                                multiple
                                                                onChange={(e) => {
                                                                    setImg(e.target.files);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="control-label col-md-2 col-md-offset-2"
                                                    htmlFor="id_comments"
                                                >
                                                    Miêu tả sản phẩm
                                                </label>
                                                <div className="col-md-6">
                                                    {/* <textarea
                                                        onChange={(event) => setDescription(event.target.value)}
                                                        className="form-control"
                                                        id="id_comments"
                                                        placeholder="Miêu tả"
                                                        rows="5"
                                                    ></textarea> */}
                                                    <div style={{ backgroundColor: '#fff' }}>
                                                        <Editor
                                                            editorState={description}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor"
                                                            placeholder="Miêu tả"
                                                            onEditorStateChange={onEditorStateChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-offset-1 col-md-12">
                                                    {/* <button
                                                    className="btn-lg btn-primary"
                                                    style={{ marginLeft: 100, marginRight: 100, background: 'red' }}
                                                    type="submit"
                                                    onClick={confirmEdit}
                                                >
                                                    Thay đổi
                                                </button>
                                                <button className="btn-lg btn-primary" type="" onClick={cancelEdit}>
                                                    Hủy
                                                </button> */}

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
                                                    <Button
                                                        onClick={cancelEdit}
                                                        style={{ background: '#0de667', color: 'white' }}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </DialogActions>
                    </Dialog>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
