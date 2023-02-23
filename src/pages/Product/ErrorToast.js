import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorToast = ({ message }) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
    });

    return <ToastContainer />;
};

export default ErrorToast;
