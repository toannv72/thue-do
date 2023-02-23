import React, { Component } from 'react';
class Tab extends Component {
    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };
    render() {
        const {
            onClick,
            props: { activeTab, label },
        } = this;
        let className = '';
        if (activeTab === label) {
            className += 'active';
        }
        return (
            <div id="ufo-home" className={`${className} ufo-bar2-col2 ufo-bar2-block`}>
                <div className="ufo-bar2-col2-inner flexbox">
                    <span>
                        <i className="uil uil-trophy"></i>
                    </span>
                    <span className="value" onClick={onClick} style={{ cursor: 'pointer' }}>
                        <h3>{label}</h3>
                    </span>
                </div>
            </div>
        );
    }
}

export default Tab;
