import React from 'react';
import './DeleteButton.scss';
import deletedicon from '../../../assets/icon/ic_deleted.svg';

function DeleteButton({ id, handleDeleteDataId, setIsDeleteModalOpen, stopBubbling }) {
  const handleDeleteClick = (e) => {
    stopBubbling(e);
    setDeleteDataId(id);
    setIsDeleteModalOpen(true);
  };

  const setDeleteDataId = (id) => {
    handleDeleteDataId(id);
  };

  return (
    <button id='card__delete-btn' onClick={handleDeleteClick}>
      <img src={deletedicon} alt='포스트 카드 삭제 버튼' />
    </button>
  );
}

export default DeleteButton;
