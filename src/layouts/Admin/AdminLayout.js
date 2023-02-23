import styles from './Admin.module.scss';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar/index';
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    const [state, setState] = useState(false);
    // const toan = JSON.parse(localStorage.getItem('user')).role[0].name;

    // useEffect(() => {
    //     setState(toan === 'ADMIN' ? true : false);
    // }, [toan]);
    return (
        <div>
            {/* {!state ? (
                <></>
            ) : ( */}
            <>
                <link
                    href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/css/datepicker.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/css/bootstrap-switch.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="https://davidstutz.github.io/bootstrap-multiselect/css/bootstrap-multiselect.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <script
                    src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/js/bootstrap-datepicker.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/js/bootstrap-switch.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="https://davidstutz.github.io/bootstrap-multiselect/js/bootstrap-multiselect.js"
                    type="text/javascript"
                ></script>
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </>
            {/* )} */}
        </div>
    );
}
AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AdminLayout;
