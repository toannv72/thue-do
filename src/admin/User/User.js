import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material';
const cx = classNames.bind(styles);

export default function User() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showLOCKEDConfirmation, setShowLOCKEDConfirmation] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [productToLook, setProductToLook] = useState(null);

    const [userToEdit, setUserToEdit] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    // const [avatar, setAvatar] = useState();

    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        window.scrollTo(0, 0);
        setCurrentPage(value);

        // console.log(value);
    };
    const confirmEdit = (event) => {
        event.preventDefault();
        const updatedUser = {
            id: userToEdit,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
        };
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}users/update`, updatedUser)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Thay đổi sản phẩm thành công!`);
                } else {
                    toast.error(`Thay đổi sản phẩm không thành công!`);
                }
                setShowEditUser(false);
            })
            .catch((error) => {
                console.log(error);
                setShowEditUser(false);
                toast.error(`Thay đổi sản phẩm không thành công!`);
            });
    };

    const cancelEdit = () => {
        setShowEditUser(false);
        setUserToEdit(null);
    };
    const handleLocked = () => {
        setShowDeleteConfirmation(true);
    };
    const handleEdit = () => {
        setShowEditUser(true);
    };
    const handleUnLocked = () => {
        setShowLOCKEDConfirmation(true);
    };
    const confirmLook = (event) => {
        const updatedProduct = {
            id: productToLook,
            status: 'LOCKED',
        };
        console.log(updatedProduct);
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}users/change/status`, updatedProduct)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Khóa người dùng thành công!`);
                } else {
                    toast.error(`Khóa người dùng không thành công!`);
                }
                setShowDeleteConfirmation(false);
            })

            .catch((error) => {
                console.log(error);
                toast.error(`Khóa người dùng không thành công!`);
            });
    };

    const confirmUNLOCKED = (event) => {
        const updatedProduct = {
            id: productToLook,
            status: 'UNLOCKED',
        };
        console.log(updatedProduct);
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}users/change/status`, updatedProduct)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Mở khóa người dùng thành công!`);
                } else {
                    toast.error(`Mở khóa  dùng không thành công!`);
                }
                setShowLOCKEDConfirmation(false);
            })

            .catch((error) => {
                console.log(error);
                toast.error(`Mở khóa dùng không thành công!`);
            });
    };
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setProductToLook(null);
        setShowLOCKEDConfirmation(false);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URLS}users/${searchTerm}?page=${currentPage - 1}&size=10`,
            );
            const data = await response.json();
            setSearchResults(data.contends);
            setTotalPage(data.totalPage);
        };

        if (searchTerm !== '') {
            fetchSearchResults();
        }
    }, [searchTerm, productToLook, showLOCKEDConfirmation, showDeleteConfirmation, currentPage]);
    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URLS}users/getAll?page=${currentPage - 1}&size=10`,
            );
            const data = await response.json();
            setSearchResults(data.contends);
            setTotalPage(data.totalPage);
        };

        if (searchTerm === '') {
            fetchSearchResults();
        }
    }, [searchTerm, productToLook, showLOCKEDConfirmation, showDeleteConfirmation, currentPage]);

    const handleInputChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchTerm(searchValue);
             setCurrentPage(1);
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
                                    {result.status === 'UNLOCKED' ? (
                                        <div className={cx('lock')}>
                                            <button
                                                className=" btn-primary btn-sm "
                                                type="button"
                                                title="Khóa tài khoản"
                                                onClick={() => {
                                                    handleLocked();
                                                    setProductToLook(result.id);
                                                }}
                                            >
                                                <i className="fas fa-lock"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={cx('UNLOCKE')}>
                                            <button
                                                className=" btn-primary btn-sm "
                                                type="button"
                                                title="Mở khóa tài khoản"
                                                onClick={() => {
                                                    handleUnLocked();
                                                    setProductToLook(result.id);
                                                }}
                                            >
                                                <i className="fas fa-lock-open"></i>
                                            </button>
                                        </div>
                                    )}
                                    <div className={cx('edit')}>
                                        <button
                                            className=" btn-primary btn-sm "
                                            type="button"
                                            title="Sửa"
                                            id="show-emp"
                                            data-toggle="modal"
                                            data-target="#ModalUP"
                                            onClick={() => {
                                                setUserToEdit(result.id);
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
            {showDeleteConfirmation && (
                <div className={cx('contact-container')}>
                    <div className="swal-modal" role="dialog" aria-modal="true">
                        <div className="swal-title">
                            <h1>Cảnh báo</h1>
                        </div>
                        <h2>Bạn có chắc chắn là muốn khóa user này?</h2>
                        <div className={cx('swal-footer')}>
                            <button className={cx('button')} onClick={cancelDelete}>
                                Hủy bỏ
                            </button>

                            <button className={cx('button1')} onClick={confirmLook}>
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showLOCKEDConfirmation && (
                <div className={cx('contact-container')}>
                    <div className="swal-modal" role="dialog" aria-modal="true">
                        <div className="swal-title">
                            <h1>Cảnh báo</h1>
                        </div>
                        <h2>Bạn có chắc chắn là muốn mở khóa user này?</h2>
                        <div className={cx('swal-footer')}>
                            <button className={cx('button')} onClick={cancelDelete}>
                                Hủy bỏ
                            </button>

                            <button className={cx('button1')} onClick={confirmUNLOCKED}>
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Dialog
                maxWidth={500}
                // maxHeight={800}
                open={showEditUser}
                // TransitionComponent={Transition}
                keepMounted
                onClose={cancelEdit}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <div className={cx('contact-container1')}>
                        <div className="panel panel-primary dialog-panel">
                            <div className={cx('panel-heading')}>
                                <h4>Chỉnh sửa người dùng</h4>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                            Họ
                                        </label>
                                        <div className="col-md-8">
                                            <div className="col-md-4 indent-small">
                                                <div className="form-group internal">
                                                    <input
                                                        className="form-control"
                                                        id="id_last_name"
                                                        placeholder="Họ"
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(event) => setFirstName(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                            Tên
                                        </label>
                                        <div className="col-md-8">
                                            <div className="col-md-4 indent-small">
                                                <div className="form-group internal">
                                                    <input
                                                        className="form-control"
                                                        id="id_last_name"
                                                        placeholder="Tên"
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(event) => setLastName(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                            Số điện thoại
                                        </label>
                                        <div className="col-md-8">
                                            <div className="col-md-4 indent-small">
                                                <div className="form-group internal">
                                                    <input
                                                        className="form-control"
                                                        id="id_last_name"
                                                        placeholder="Số điện thoại"
                                                        type="text"
                                                        value={phone}
                                                        onChange={(event) => setPhone(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                            Email
                                        </label>
                                        <div className="col-md-8">
                                            <div className="col-md-4 indent-small">
                                                <div className="form-group internal">
                                                    <input
                                                        className="form-control"
                                                        id="id_last_name"
                                                        placeholder="Email"
                                                        type="text"
                                                        value={email}
                                                        onChange={(event) => setEmail(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-group">
                                    <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                        Avatar
                                    </label>
                                    <div className="col-md-8">
                                        <div className="col-md-4 indent-small">
                                            <div className="form-group internal">
                                                <input
                                                    className="form-control"
                                                    id="id_last_name"
                                                    placeholder="Đặt cọc"
                                                    type="text"
                                                    value={avatar}
                                                    onChange={(event) => setAvatar(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="form-group">
                                        <label className="control-label col-md-2 col-md-offset-2" htmlFor="id_title">
                                            Mật khẩu
                                        </label>
                                        <div className="col-md-8">
                                            <div className="col-md-4 indent-small">
                                                <div className="form-group internal">
                                                    <input
                                                        className="form-control"
                                                        id="id_last_name"
                                                        placeholder="Mật khẩu"
                                                        type="text"
                                                        value={password}
                                                        onChange={(event) => setPassword(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </>
    );
}
