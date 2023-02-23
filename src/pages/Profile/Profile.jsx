import { Link, Route, Routes } from 'react-router-dom';
import Address from './Address/Address';
import History from './History/History';
import Information from './Information/Information';
import images from '~/assets/images';
import Pay from './Pay/Pay';
import './Profile.css';
import Tabs from './tab/tabs';
function Profile() {
    const id = localStorage.getItem('username');
    const imgUser = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div className="back-to-top" style={{ display: 'block', opacity: 1 }}></div>
            <div>
                <div className="user-header-wrapper">
                    <div className="user-header-inner flexbox">
                        <div className="user-header-overlay"></div>
                        <img className="user-header" src={imgUser.imageUrl} alt="" />
                    </div>
                </div>
                <div className="user-info-bar">
                    <div className="ufo-bar-col1"></div>
                    <div className="ufo-bar-col2">
                        <div className="ufo-bar-col2-inner">
                            <div className="user-icon-wrapper">
                                <img
                                    className="user-icon"
                                    src={imgUser.avatar ? imgUser.avatar : images.noImage}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col3">
                        <div className="ufo-bar-col3-inner">
                            <div className="username-wrapper-outer">
                                <div className="username-wrapper">
                                    <h3 className="username-dev">
                                        {!imgUser.firstName
                                            ? imgUser.username
                                            : `${imgUser.firstName} ${imgUser.lastName}`}
                                    </h3>
                                </div>
                                <div>
                                    <a className="ufo-bar-fff" href="#">
                                        <span>857</span> Followers
                                    </a>
                                    <a className="ufo-bar-fff" href="#">
                                        <span>137</span> Following
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col4">
                        <div className="ufo-bar-col4-inner">
                            <button className="button2 btn-primary2">
                                <i className="uil uil-plus"></i> Subscribe<div className="btn-secondary2"></div>
                            </button>
                        </div>
                    </div>
                    <div className="ufo-bar-col5"></div>
                </div>
                {/* <div className="ufo-bar2-col1"></div> */}
                <Tabs>
                    <div label="Thông tin cá nhân" className="ufo-bar2-col2 ufo-bar2-block">
                        <Information />
                    </div>
                    <div label="thong tin thanh toan">
                        <Pay />
                    </div>
                    <div label="Address" className="ufo-bar2-col2 ufo-bar2-block">
                        <Address />
                    </div>
                </Tabs>
            </div>
            {/* <Routes>
                <Route path="/" element={<Information />} />
                <Route path="/@:pay" element={<Pay />} />
                <Route path="/Contact" element={<Address />} />
                <Route path="/Add" element={<History />} />
            </Routes> */}
            aaaaaaaa
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
            <h1> q</h1>
        </div>
    );
}

export default Profile;
