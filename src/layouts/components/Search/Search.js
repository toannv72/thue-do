import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await fetch(`${process.env.REACT_APP_BASE_URLS}products/${searchValue}`);
            const data = await result.json();
            setSearchResult(data);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleSearch=() => {
    console.log(123);
}
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Sản phẩm</h4>
                            {searchResult.map((result, index) =>
                                index <= 3 ? <AccountItem key={index} data={result} /> : null,
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            placeholder="Tìm kiếm món đồ nào đó..."
                            spellCheck={false}
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                        />
                        {!!searchValue && !loading && (
                            <button className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        {searchValue ? (
                            <a href={`/search:${searchValue}`}>
                                <button className={cx('search-btn')}>
                                    <SearchIcon />
                                </button>
                            </a>
                        ) : (
                            <button className={cx('search-btn')} >
                                <SearchIcon />
                            </button>
                        )}
                    </div>
            
            </HeadlessTippy>
        </div>
    );
}

export default Search;
