import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PostCard from '../../components/post-id/post-card';
import { getMessages, getRecipient } from '../../apis/api';
import './PostId.scss';
import plusicon from '../../assets/icon/ic_plus.svg';
import loadingicon from '../../assets/icon/ic_loading.svg';
import settingicon from '../../assets/icon/ic_setting.svg';
import Modal from '../../components/post-id/postcard-modal';
import DeleteModal from '../../components/post-id/postcard-delete-modal';
import HeaderPost from '../../components/headerPost';
import SearchInput from '../../components/post-id/search-input';
import PostDeleteModal from '../../components/post-id/post-delete-modal';

function SettingBtn({ handlePostDeleteModalOpen }) {
  const [isSettingActive, setIsSettingActive] = useState(false);

  const handleSettingBtnClick = () => {
    setIsSettingActive(!isSettingActive);
  };

  const handleClickPostDeleteBtn = () => {
    handlePostDeleteModalOpen(true);
  };

  return (
    <>
      {isSettingActive && (
        <button className='post-edit-btn-container__delete-btn' onClick={handleClickPostDeleteBtn}>
          포스트 삭제하기
        </button>
      )}
      <button
        className={`post-edit-btn-container__setting-btn ${isSettingActive && 'active'}`}
        onClick={handleSettingBtnClick}>
        <img
          className='post-edit-btn-container__setting-btn-img'
          src={settingicon}
          alt='포스트 배경화면 설정 버튼'
        />
      </button>
    </>
  );
}

function PostId() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);

  const [backgroundImg, setBackgroundImg] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  const [messagesData, setMessagesData] = useState([]);
  const [firstMessagesData, setFirstMessagesData] = useState([]);
  const [recipientData, setRecipientData] = useState([]);
  const [deleteDataId, setDeleteDataId] = useState('');
  const [modalData, setModalData] = useState([]);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getInfosFromData = async (id) => {
    const [messages, recipient] = await Promise.all([getMessages(id), getRecipient(id)]);
    setMessagesData(messages);
    setFirstMessagesData(messages);
    setRecipientData(recipient);
    setLoading(false);
  };

  // 마운트 시 실행 로직
  useEffect(() => {
    getInfosFromData(id);
  }, []);

  useEffect(() => {
    selectBackgroundTypeByData(recipientData);
  }, [recipientData]);

  // 모달 데이터 관리함수
  const setModalDataByData = (modalId) => {
    const [modalItem] = messagesData.filter((data) => data.id == modalId);
    setModalData(modalItem);
  };

  // 모달창 오픈용 boolean 상태값 관리 함수
  const handleModalOpen = (value) => {
    setIsModalOpen(value);
  };

  const handleDeleteModalOpen = (value) => {
    setIsDeleteModalOpen(value);
  };

  const handlePostDeleteModalOpen = (value) => {
    setIsPostDeleteModalOpen(value);
  };

  // 배경화면 상태값 관리함수
  const selectBackgroundTypeByData = (recipientData) => {
    recipientData.backgroundImageURL === null
      ? setBackgroundColor(recipientData.backgroundColor)
      : setBackgroundImg(recipientData.backgroundImageURL);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImg})`,
  };

  // 메세지 삭제 함수
  const handleDeleteMessage = (messageId) => {
    const deleteMessagesData = messagesData.filter((data) => data.id !== messageId);
    const deleteFirstMessagesData = firstMessagesData.filter((data) => data.id !== messageId);
    setMessagesData(deleteMessagesData);
    setFirstMessagesData(deleteFirstMessagesData);
  };

  const handleDeleteDataId = (id) => {
    setDeleteDataId(id);
  };

  // 검색결과 반영 및 카테고리 관리 함수
  const setSearchInfo = (category, value) => {
    if (value === null) {
      setMessagesData(firstMessagesData);
    } else {
      setFilteredData(category, value);
    }
  };

  const setFilteredData = (category, value) => {
    const regex = new RegExp(value.replace(/\s/g, ''), 'i');
    const filteredData = firstMessagesData.filter((data) => {
      const senderWithoutSpace = data.sender.replace(/\s/g, '');
      const contentWithoutSpace = data.content.replace(/\s/g, '');
      if (category === '전체')
        return regex.test(senderWithoutSpace) || regex.test(contentWithoutSpace);
      if (category === '이름') return regex.test(senderWithoutSpace);
      if (category === '내용') return regex.test(contentWithoutSpace);
    });
    setMessagesData(filteredData);
  };

  return (
    <>
      {loading ? (
        <div className='loading-wrapper'>
          <img className='loading-wrapper__spinner' src={loadingicon} alt='로딩 중' />
        </div>
      ) : (
        <>
          <HeaderPost />
          <div className={`post-wrapper ${backgroundColor}`} style={backgroundImageStyle}>
            <SearchInput setSearchInfo={setSearchInfo} />
            <div className='post-edit-btn-container'>
              <Link to='/list' className='post-edit-btn-container__back-btn'>
                <span className='post-edit-btn-container__back-btn'>← 뒤로가기</span>
              </Link>
              <SettingBtn handlePostDeleteModalOpen={handlePostDeleteModalOpen} />
            </div>
            <div className='posted-page-container'>
              <Link to={`/post/${id}/message`} className='add-post-card'>
                <div className='add-post-card__plus-icon'>
                  <img src={plusicon} alt='포스트 카드 추가 버튼' />
                </div>
              </Link>
              {messagesData.map((data) => (
                <PostCard
                  key={data.id}
                  data={data}
                  handleModalOpen={handleModalOpen}
                  handleDeleteDataId={handleDeleteDataId}
                  setModalDataByData={setModalDataByData}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ))}
              {isModalOpen && (
                <Modal
                  handleModalOpen={handleModalOpen}
                  modalData={modalData}
                  isModalOpen={isModalOpen}
                />
              )}
              {isDeleteModalOpen && (
                <DeleteModal
                  handleDeleteMessage={handleDeleteMessage}
                  deleteDataId={deleteDataId}
                  handleDeleteModalOpen={handleDeleteModalOpen}
                  isDeleteModalOpen={isDeleteModalOpen}
                />
              )}
              {isPostDeleteModalOpen && (
                <PostDeleteModal
                  handlePostDeleteModalOpen={handlePostDeleteModalOpen}
                  id={id}
                  isPostDeleteModalOpen={isPostDeleteModalOpen}
                />
              )}
              {/* {isChangeBackModalOpen && (
                <ChangeBackModal handleChangeBackModalOpen={handleChangeBackModalOpen} id={id} />
              )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PostId;
