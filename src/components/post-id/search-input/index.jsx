import React, { useState, useRef, useEffect } from 'react';
import './SearchInput.scss';
import arrowicon from '../../../assets/icon/ic_arrow_down.svg';
import searchicon from '../../../assets/icon/ic_search.svg';
import reseticon from '../../../assets/icon/ic_search_reset.svg';

function SearchInput({ setSearchInfo }) {
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const [hasSearchValue, setHasSearchValue] = useState(false);
  const [searchCategory, setSearchCategroy] = useState('전체');
  const dropdownMenuBarRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropMenuBarNode = dropdownMenuBarRef.current;
      const dropMenuNode = dropdownMenuRef.current;
      const shouldCloseMenu =
        dropMenuBarNode &&
        dropMenuNode &&
        !dropMenuBarNode.contains(event.target) &&
        !dropMenuNode.contains(event.target);

      if (isSearchCategoryOpen) {
        if (shouldCloseMenu) {
          setIsSearchCategoryOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchCategoryOpen]);

  const handleSearchCategory = (e) => {
    const { textContent } = e.target;
    setSearchCategroy(textContent);
    setIsSearchCategoryOpen(false);
  };

  const handleSearchInput = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      setSearchInfo(searchCategory, value);
    }
  };

  const resetSearchValue = (e) => {
    const { value } = e.target;
    if (value === '') {
      setSearchInfo(null, null);
    }
    if (value.length > 0) {
      setHasSearchValue(true);
    } else {
      setHasSearchValue(false);
    }
  };

  const handleClickResetBtn = () => {
    const inputNode = searchInputRef.current;
    if (inputNode) {
      inputNode.value = '';
      setHasSearchValue(false);
      setSearchInfo(null, null);
    }
  };

  const handleBtnClick = () => {
    handleSearchInput();
  };

  return (
    <div className='search-container'>
      <div className='search-container__dropdown'>
        <div
          className='search-container__dropdown-menu'
          ref={dropdownMenuBarRef}
          onClick={() => setIsSearchCategoryOpen(!isSearchCategoryOpen)}>
          {searchCategory}
          <img
            className={
              isSearchCategoryOpen
                ? 'search-container__dropdown-menu-img-active'
                : 'search-container__dropdown-menu-img'
            }
            src={arrowicon}
            alt=' 검색창 드롭다운 화살표 아이콘'
          />
        </div>
        {isSearchCategoryOpen && (
          <div className='search-container__dropdown-menubar' ref={dropdownMenuRef}>
            <div className='search-container__dropdown-menubar-all' onClick={handleSearchCategory}>
              전체
            </div>
            <div className='search-container__dropdown-menubar-name' onClick={handleSearchCategory}>
              이름
            </div>
            <span
              className='search-container__dropdown-menubar-content'
              onClick={handleSearchCategory}>
              내용
            </span>
          </div>
        )}
      </div>

      <label htmlFor='search-input'></label>
      <input
        type='text'
        id='search-input'
        className='search-container__input'
        onKeyDown={handleSearchInput}
        onChange={resetSearchValue}
        ref={searchInputRef}
        placeholder='보고 싶은 메시지가 있나요?'
      />
      {hasSearchValue && (
        <button className='search-container__reset-btn' onClick={handleClickResetBtn}>
          <img
            className='search-container__reset-btn-img'
            src={reseticon}
            alt='검색창에 값이 존재할 경우 생성되는 값 리셋 버튼'
          />
        </button>
      )}
      <button className='search-container__btn' onClick={handleBtnClick}>
        <img className='search-container__btn-img' src={searchicon} alt='검색창 버튼 아이콘' />
        <span className='search-container__btn-word'>검색</span>
      </button>
    </div>
  );
}

export default SearchInput;
