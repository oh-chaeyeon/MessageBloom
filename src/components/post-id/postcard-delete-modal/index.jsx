import React, { useEffect } from 'react';
import './DeleteModal.scss';
import { deleteMessage } from '../../../apis/api';

function DeleteModal({
  handleDeleteMessage,
  deleteDataId,
  handleDeleteModalOpen,
  isDeleteModalOpen,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        handleDeleteModalOpen(false);
      }
    };

    if (isDeleteModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDeleteModalOpen]);

  const handleDeleteData = async (id) => {
    try {
      await deleteMessage(id);
      handleDeleteMessage(id);
    } catch (e) {
      console.error(`메세지 삭제 중 오류 발생 : ${e}`);
      alert('에러가 발생했습니다. 페이지를 새로고침합니다.');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  const handleCheckClick = () => {
    handleDeleteData(deleteDataId);
    handleDeleteModalOpen(false);
  };

  const handleCancelClick = () => {
    handleDeleteModalOpen(false);
  };

  return (
    <div className='delete-modal-wrapper' onClick={handleCancelClick}>
      <div
        className='delete-modal-container'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <p className='delete-modal-container__message'>정말 삭제하시겠어요?</p>
        <div className='delete-modal-container__btns'>
          <button id='delete-modal-container__btns-check-btn' onClick={handleCheckClick} autoFocus>
            확인
          </button>
          <button id='delete-modal-container__btns-cancel-btn' onClick={handleCancelClick}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
