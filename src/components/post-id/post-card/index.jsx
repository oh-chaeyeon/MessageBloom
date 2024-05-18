import React from 'react';
import './PostCard.scss';
import DeleteButton from '../postcard-delete-button';
import getClassByRole from '../../../utils/post-id/getClassByRole';
import getTimeLocale from '../../../utils/post-id/getTimeLocale';
import contentSlice from '../../../utils/post-id/contentSlice';

export const fontClass = {
  'Noto Sans': 'Noto-Sans',
  Pretendard: 'pretendard',
  나눔명조: 'NanumMyeongjo',
  '나눔손글씨 손편지체': 'NanumSonPyeonJiCe',
};

function PostCard({
  data,
  setModalDataByData,
  handleModalOpen,
  setIsDeleteModalOpen,
  handleDeleteDataId,
}) {
  const handleCardClick = () => {
    handleModalOpen(true);
    setModalDataByData(data.id);
  };

  const stopBubbling = (e) => {
    e.stopPropagation();
  };

  const editTextOfCard = (text) => {
    const lines = text.split(/<br>|\n/);
    const paragraphs = lines.map((line, index) => (
      <p
        className={`card__content ${fontClass[data.font]}`}
        style={line.length === 0 ? { height: '25px' } : null}
        key={index}>
        {line === '' ? ' ' : line}
      </p>
    ));
    return <div className='card__contents'>{paragraphs}</div>;
  };

  return (
    <div className='card-container' onClick={handleCardClick}>
      <div className='card-info-container'>
        <img
          className='card-info__img'
          src={data.profileImageURL}
          alt='받은 포스트 카드 작성자 프로필 이미지'
        />
        <div className='card-info-detail-container'>
          <p className='card-info__name'>From. {data.sender}</p>
          <span className={`card-info__role ${getClassByRole(data.relationship)}`}>
            {data.relationship}
          </span>
        </div>
        <DeleteButton
          id={data.id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDeleteDataId={handleDeleteDataId}
          stopBubbling={stopBubbling}
        />
      </div>
      <div className='card__underline'></div>
      {editTextOfCard(contentSlice(data.content.replace(/\\/g, '')))}
      <span className='card__date'>{getTimeLocale(data.createdAt)}</span>
    </div>
  );
}

export default PostCard;
