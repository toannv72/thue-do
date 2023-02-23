import classNames from 'classnames/bind';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
export default function LoginGoogle() {
    const clientId = '250770464834-30orioj9sk0kjmj5ssqkhrfb02s9r46l.apps.googleusercontent.com';
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = async (res) => {
        localStorage.setItem('username', JSON.stringify(res.profileObj.name));
        localStorage.setItem('imageUrl', JSON.stringify(res.profileObj.imageUrl));
        localStorage.setItem('userGoogle', JSON.stringify(res.profileObj));
        window.location.href = '/';
    };

    const onFailure = (res) => {
        console.log('onFailure', res);
    };

    return (
        <>
            <GoogleLogin 
                buttonText="Login Google"
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                className={cx("button-google")}
                
            />
        </>
    );
}
