import { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function AlertBox({ show, message, onClose }) {
    const [visible, setVisible] = useState(show);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        <Alert show={visible} variant="success" onClose={handleClose} dismissible>
            <div style={{width:100 ,height:100,}}><h1>{message}</h1></div>
        </Alert>
    );
}

