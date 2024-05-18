import './ImagePicker.scss';
import { IMAGE_NAMES, IMAGE_URLS } from '../../../utils/post/postPageConstants';
import { PROFILES } from '../../../utils/post-id-message/postMessagePageConstants';
import { useState, useEffect } from 'react';
import ImageAddModal from '../image-add-modal';
import checkIcon from '../../../assets/icon/ic_check.svg';
import delIcon from '../../../assets/icon/ic_deleted.svg';

function ImageOption({ handleImageChange, imageName, selectedImage }) {
  return (
    <>
      <input
        type='radio'
        id={imageName}
        name='images'
        value={imageName}
        onChange={handleImageChange}
      />
      <label
        className={`background-form__radio-image-label ${
          selectedImage === `${imageName}` && 'background-form__radio-image--active'
        }`}
        htmlFor={imageName}>
        <div
          className={`${
            selectedImage === `${imageName}` && 'background-form__radio-image--translucent'
          }`}></div>
        <div
          className={`background-form__check-icon ${
            selectedImage === `${imageName}` && 'background-form__radio-image--active'
          }`}>
          <img src={checkIcon} alt='체크 아이콘' />
        </div>
      </label>
    </>
  );
}

export default function ImagePicker({ setRecipient, customImg, setCustomImg }) {
  const [selectedImage, setSelectedImage] = useState(customImg ? customImg : IMAGE_NAMES[0]);
  const [handleModalOpen, setHandleModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const { value } = e.target;
    setSelectedImage(value);
    setRecipient((prev) => ({ ...prev, backgroundImageURL: IMAGE_URLS[value] }));
    setCustomImg(null);
  };

  const handleCustomClick = () => (setSelectedImage(null), setHandleModalOpen(true));

  const handleDeleteClick = () => {
    setRecipient((prev) => ({ ...prev, backgroundImageURL: IMAGE_URLS[0] }));
    setCustomImg(null);
    setSelectedImage(IMAGE_NAMES[0]);
  };

  return (
    <div className='background-form__image-picker'>
      {IMAGE_NAMES.map((imageName, i) => (
        <ImageOption
          key={i}
          handleImageChange={handleImageChange}
          imageName={imageName}
          selectedImage={selectedImage}
        />
      ))}
      {customImg ? (
        <div
          className='background-form__custom-image'
          style={{
            backgroundImage: `url(${customImg})`,
          }}>
          <img
            src={delIcon}
            className='background-form__custom-image__del-btn'
            onClick={handleDeleteClick}
          />
          <div className='example__container'>
            <div className='example__writers'>
              <p className='example__writers__to'>To. 받는 사람 이름</p>
            </div>
            <img
              className='example__writers__profile'
              src={PROFILES[0].src}
              alt='프로필 이미지 예시'
            />
            <p className='example__writers__to'>1명이 작성했어요!</p>
          </div>
        </div>
      ) : (
        <button onClick={handleCustomClick} className='background-form__add-image-btn'>
          이미지 직접 추가하기
        </button>
      )}

      {handleModalOpen && (
        <ImageAddModal
          setCustomImg={setCustomImg}
          setRecipient={setRecipient}
          setHandleModalOpen={setHandleModalOpen}
        />
      )}
    </div>
  );
}
