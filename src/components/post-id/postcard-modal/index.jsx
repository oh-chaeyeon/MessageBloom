import React, { useEffect } from 'react';
import getClassByRole from '../../../utils/post-id/getClassByRole';
import './Modal.scss';
import getTimeLocale from '../../../utils/post-id/getTimeLocale';
import { fontClass } from '../post-card';

function Modal({ modalData, handleModalOpen, isModalOpen }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        handleModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleWrapperClick = () => {
    handleModalOpen(false);
  };

  const editTextOfModal = (text) => {
    const lines = text.split(/<br>|\n/);
    const paragraphs = lines.map((line, index) => (
      <p
        className={`modal__content ${fontClass[modalData.font]}`}
        style={line.length === 0 ? { height: '25px' } : null}
        key={index}>
        {line === '' ? ' ' : line}
      </p>
    ));
    return <div className='modal__content-container'>{paragraphs}</div>;
  };

  return (
    <div className='modal-wrapper' onClick={handleWrapperClick}>
      <div
        className='modal-container'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className='modal-info'>
          <img
            className='modal-info__img'
            src={modalData.profileImageURL}
            alt='받은 포스트 카드 작성자 프로필 이미지'
          />
          <div className='modal-info-detail-container'>
            <p className='modal-info__name'>From. {modalData.sender}</p>
            <span className={`modal-info__role ${getClassByRole(modalData.relationship)}`}>
              {modalData.relationship}
            </span>
          </div>
          <span className='modal__date'>{getTimeLocale(modalData.createdAt)}</span>
        </div>
        <div className='modal__underline'></div>
        {editTextOfModal(modalData.content.replace(/\\/g, ''))}
        <button
          onClick={() => {
            handleModalOpen(false);
          }}
          id='modal-confirm__btn'
          autoFocus>
          확인
        </button>
      </div>
    </div>
  );
}

export default Modal;
