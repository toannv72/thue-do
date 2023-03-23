import { Button, Dialog, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);
function Information() {
    const User = JSON.parse(localStorage.getItem('user'));
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);
    const [lastName, setLastName] = useState(User.lastName);
    const [firstName, setFirstName] = useState(User.firstName);
    const [address, setAddress] = useState(User.address);
    const [phone, setPhone] = useState(User.phone);
    const [email, setEmail] = useState(User.email);

    const handleEdit = () => {
        setShowEditConfirmation(true);
    };
    const cancelEdit = () => {
        setShowEditConfirmation(false);
    };

    function Change() {
        axios
            .put(`${process.env.REACT_APP_BASE_URLS}users/update`, {
                id: User.id,
                lastName: lastName,
                firstName: firstName,
                address: address,
                phone: phone,
                email: email,
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Thay đổi thông tin thành công!`);
                } else {
                    toast.error(`Thay đổi thông tin không thành công!`);
                }
                localStorage.setItem('user', JSON.stringify(response.data));
                // console.log(response.data);
                setShowEditConfirmation(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thay đổi thông tin không thành công!`);
                setShowEditConfirmation(false);
            });
    }
    return (
        <>
            <ToastContainer />
            <h1> Thay đổi thông tin </h1>
            <div classNames={cx('TextField1')} style={{ margin: 10, font: 'caption' }}>
                <TextField
                    disabled
                    // id="filled-disabled"
                    defaultValue="Hello World"
                    // variant="filled"
                    label="Tên"
                    size="Normal"
                    value={User.firstName}
                    style={{ font: 'caption' }}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="outlined-basic"
                    label="Họ"
                    disabled
                    // variant="filled"
                    size="Normal"
                    value={User.lastName}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="standard-disabled"
                    label="Địa chỉ nhận hàng"
                    // variant="filled"
                    disabled
                    size="Normal"
                    fullWidth
                    value={User.address}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="standard-disabled"
                    label="Gmail"
                    // variant="filled"
                    disabled
                    size="Normal"
                    fullWidth
                    value={User.email}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="outlined-disabled"
                    label="Số điện thoại"
                    // variant="filled"
                    size="Normal"
                    disabled
                    fullWidth
                    value={User.phone}
                ></TextField>
            </div>
            <Button variant="contained" color="success" style={{ margin: 10 }} onClick={handleEdit}>
                Thay đổi
            </Button>

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
                    <div style={{ margin: 10, width: 500 }}>
                        <div classNames={cx('TextField1')} style={{ margin: 10, font: 'caption' }}>
                            <TextField
                                // id="filled-disabled"
                                defaultValue="Hello World"
                                // variant="filled"
                                label="Tên"
                                size="Normal"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            ></TextField>
                        </div>
                        <div classNames={cx('TextField')} style={{ margin: 10 }}>
                            <TextField
                                id="outlined-basic"
                                label="Họ"
                                // variant="filled"
                                size="Normal"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            ></TextField>
                        </div>
                        <div classNames={cx('TextField')} style={{ margin: 10 }}>
                            <TextField
                                id="standard-disabled"
                                label="Địa chỉ nhận hàng"
                                // variant="filled"

                                size="Normal"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></TextField>
                        </div>
                        <div classNames={cx('TextField')} style={{ margin: 10 }}>
                            <TextField
                                id="standard-disabled"
                                label="Gmail"
                                // variant="filled"

                                size="Normal"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></TextField>
                        </div>
                        <div classNames={cx('TextField')} style={{ margin: 10 }}>
                            <TextField
                                id="outlined-disabled"
                                label="Số điện thoại"
                                // variant="filled"
                                size="Normal"
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></TextField>
                        </div>
                    </div>
                </DialogActions>
                <div>
                    <Button variant="contained" color="success" style={{ margin: 10 }} onClick={Change}>
                        Thay đổi
                    </Button>
                    <Button variant="contained" style={{ margin: 10 }} onClick={cancelEdit}>
                        Hủy
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default Information;
