import { TextField } from '@mui/material';
import { useState } from 'react';

function Settings() {
    const User = JSON.parse(localStorage.getItem('user'));

    const [lastName, setLastName] = useState(User.lastName);
    const [firstName, setFirstName] = useState(User.firstName);
    const [address, setAddress] = useState(User.address);
    const [phone, setPhone] = useState(User.phone);

    return (
        <>
            <p> Thay đổi thông tin </p>
            <TextField
                id="outlined-basic"
                label="Họ "
                variant="outlined"
                size="Normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
            <TextField
                id="outlined-basic"
                label="Tên"
                variant="outlined"
                size="Normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            ></TextField>
           
            <TextField
                id="outlined-basic"
                label="Địa chỉ nhận hàng"
                variant="outlined"
                size="Normal"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></TextField>
            <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                size="Normal"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            ></TextField>
        </>
    );
}

export default Settings;
