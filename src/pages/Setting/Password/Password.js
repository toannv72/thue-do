import {
    Button,
    Dialog,
    DialogActions,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);
function Password() {
    const User = JSON.parse(localStorage.getItem('user'));

    const [passwordNew, setPasswordNew] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(User.username);
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEdit = () => {
        setShowEditConfirmation(true);
    };
    const cancelEdit = () => {
        setShowEditConfirmation(false);
        setPassword("")
        setPasswordNew("")
    };

    const confirmPassword = () => {
        const Password = {
            userName: firstName,
            currentPassword: password,
            newPassword: passwordNew,
        };
        axios
            .post(`${process.env.REACT_APP_BASE_URLS}users/change/password`, Password)
            .then((response) => {
                // toast.success(`Thay đổi mật khẩu thành công!`);
                if (response.status === 200) {
                    toast.success(`Thay đổi mật khẩu thành công!`);
                     setPassword('');
                     setPasswordNew('');
                } else {
                    toast.error(`Thay đổi mật khẩu không thành công!`);
                    
                }
                setShowEditConfirmation(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Thay đổi mật khẩu không thành công!`);
            });
    };
    return (
        <>
            <p> Thay đổi Mật khẩu </p>
            <ToastContainer />
            <div classNames={cx('TextField1')} style={{ margin: 10 }}>
                <TextField
                    disabled
                    // id="filled-disabled"
                    // variant="filled"
                    label="Tên tài khoản"
                    size="Normal"
                    value={firstName}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="outlined-basic"
                    label="Nhập mật"
                    disabled
                    // variant="filled"
                    size="Normal"
                    value="************"
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
                    <div>
                        Thay đổi Mật khẩu
                        <div classNames={cx('TextField1')} style={{ margin: 10 }}>
                            {/* <TextField
                                // id="filled-disabled"
                                // variant="filled"
                                label="Nhập mật khẩu cũ "
                                size="Normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></TextField> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Nhập mật khẩu cũ</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                // aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                label="Nhập mật khẩu cũ "
                                                edge="end"
                                            ></IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div classNames={cx('TextField')} style={{ margin: 10 }}>
                            {/* <TextField
                                id="outlined-basic"
                                label="Nhập mật khẩu mới"
                                // variant="filled"
                                size="Normal"
                                value={passwordNew}
                                onChange={(e) => setPasswordNew(e.target.value)}
                            ></TextField> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Nhập mật khẩu mới</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordNew}
                                    onChange={(e) => setPasswordNew(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                // aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                label="Nhập mật khẩu cũ "
                                                edge="end"
                                                value={passwordNew}
                                                onChange={(e) => setPasswordNew(e.target.value)}
                                            ></IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                    </div>
                </DialogActions>
                <div>
                    <Button variant="contained" color="success" style={{ margin: 10 }} onClick={confirmPassword}>
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

export default Password;
