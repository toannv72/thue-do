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
