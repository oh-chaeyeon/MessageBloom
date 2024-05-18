import React from 'react';
import './NotFound.scss';
import PostCard from '../../components/post-id/post-card';
import '../../components/post-id/post-card/PostCard.scss';

const NotFound = () => {
  const postData = {
    id: 1,
    profileImageURL:
      'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png',
    sender: '관리자',
    content:
      '요청하신 페이지를 찾을 수 없습니다🙄 놀라지 마시고, Message Bloom의 메인페이지로 이동해 주세요~ 😘 ',
    font: 'Noto-Sans',
    createdAt: new Date(),
  };
  return (
    <div className='not-found--layout'>
      <div>
        <h1 className='not-found--title'>404 NOT FOUND</h1>
      </div>
      <div className='not-found--message-from-admin'>
        <PostCard data={postData} />
      </div>
      <br />
      <br />
      <div>
        <a href='/' className='not-found--back-to-main-btn'>
          Message Bloom으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
