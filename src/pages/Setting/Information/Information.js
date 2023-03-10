import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
const cx = classNames.bind(styles);
function Information() {
    const User = JSON.parse(localStorage.getItem('user'));

    const [lastName, setLastName] = useState(User.lastName);
    const [firstName, setFirstName] = useState(User.firstName);
    const [address, setAddress] = useState(User.address);
    const [phone, setPhone] = useState(User.phone);

    return (
        <>
            <p> Thay đổi  </p>
            <div classNames={cx('TextField1')} style={{ margin: 10 }}>
                <TextField
                    disabled
                    // id="filled-disabled"
                    defaultValue="Hello World"
                    // variant="filled"
                    label="Họ "
                    size="Normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                ></TextField>
            </div>
            <div classNames={cx('TextField')} style={{ margin: 10 }}>
                <TextField
                    id="outlined-basic"
                    label="Tên"
                    disabled
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
                    disabled
                    size="Normal"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                ></TextField>
            </div>
            <Button variant="contained" color="success" style={{ margin: 10 }}>
                Thay đổi
            </Button>
        </>
    );
}

export default Information;
