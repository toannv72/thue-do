import styles from './TextRun.module.scss';

import classNames from 'classnames/bind';

function TextRun() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('div')}>
            <marquee className={cx('running-text')}>
                <p>This is some running text.</p>
                <p>This is some more running text.</p>
                <p>And even more running text.</p>
            </marquee>
        </div>
    );
}
export default TextRun;
