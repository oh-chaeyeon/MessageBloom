import React, { useState, useEffect } from 'react';
import './ChangeBackModal.scss';
import { COLOR_NAMES, DEFAULT_RECIPIENT } from './ModalConstants';
// import { patchBackgroundInfo } from '../../../apis/api';

function ColorOption({ color, selectedColor, onColorChange }) {
  return (
    <>
      <label
        className={`change-back-modal-container__pick-color-${color} ${
          selectedColor === color && 'active'
        }`}
        htmlFor={color}></label>
      <input
        type='radio'
        id={color}
        name='colors'
        value={color}
        checked={selectedColor === color}
        onChange={() => onColorChange(color)}
      />
    </>
  );
}

function ChangeBackModal({ id, handleChangeBackModalOpen }) {
  const [backgroundType, setBackgroundType] = useState('color');
  const [selectedColor, setSelectedColor] = useState('beige');
  const [backgroundURL, setBackBackgroundURL] = useState('');

  useEffect(() => {
    DEFAULT_RECIPIENT.backgroundColor = selectedColor;
    DEFAULT_RECIPIENT.backgroundImageURL = backgroundURL;
  }, [selectedColor, backgroundURL]);

  // const patchBackgroundData = async () => {
  //   const formData = new FormData();
  //   formData.append('data', DEFAULT_RECIPIENT);
  //   await patchBackgroundInfo(id, formData);
  // };
  // 확인, 취소 버튼 핸들링 함수
  const handleCheckClick = () => {
    handleChangeBackModalOpen(false);
    // patchBackgroundData();
  };

  const handleCancelClick = () => {
    handleChangeBackModalOpen(false);
  };

  // selectedColor 상태값 지정 함수
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBackBackgroundURL(value);
  };

  // 색상 or 이미지 선택 함수
  const setBackgroundTypeToColor = () => {
    setBackgroundType('color');
    setBackBackgroundURL(null);
  };

  const setBackgroundTypeToImg = () => {
    setBackgroundType('image');
  };

  return (
    <div className='change-back-modal-wrapper' onClick={handleCancelClick}>
      <div
        className='change-back-modal-container'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <p className='change-back-modal-container__message'>배경을 변경하고 싶으신가요?</p>
        <div className='change-back-modal-container__select'>
          <span
            className={`change-back-modal-container__select-color ${
              backgroundType === 'color' && 'select'
            }`}
            onClick={setBackgroundTypeToColor}>
            색상
          </span>
          <span
            className={`change-back-modal-container__select-img ${
              backgroundType === 'image' && 'select'
            }`}
            onClick={setBackgroundTypeToImg}>
            이미지
          </span>
        </div>
        <div className='change-back-modal-container__pick'>
          {backgroundType === 'color' ? (
            <div className='change-back-modal-container__pick-color'>
              {COLOR_NAMES.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selectedColor={selectedColor}
                  onColorChange={handleColorChange}
                />
              ))}
            </div>
          ) : (
            <>
              <label htmlFor='background-img-input'></label>
              <input
                id='background-img-input'
                className='change-back-modal-container__pick-img-input'
                type='text'
                placeholder='이미지 주소 입력'
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
        <div className='change-back-modal-container__btns'>
          <button
            id='change-back-modal-container__btns-check-btn'
            onClick={handleCheckClick}
            autoFocus>
            확인
          </button>
          <button id='change-back-modal-container__btns-cancel-btn' onClick={handleCancelClick}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeBackModal;
