import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HeaderPost.scss';
import shareicon20 from '../../assets/icon/ic_share_20.svg';
import shareicon24 from '../../assets/icon/ic_share_24.svg';
import rectangle from '../../assets/icon/ic_rectangle.svg';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '../../utils/windowWidthConstants.js';
import useWindowWidth from '../../hooks/useWindowWidth.js';
import { getRecipient } from '../../apis/api.js';
import ProfileMessageCounter from '../commons/ProfileMessageCounter';
import Emojis from './dropdown-emojis';

export default function HeaderPost() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recipientData, setRecipientData] = useState(null);
  const { id } = useParams();
  const windowWidth = useWindowWidth();
  const isDesktopSize = windowWidth >= DESKTOP_WIDTH;
  const isTabletSize = windowWidth >= TABLET_WIDTH;
  const shareicon = isTabletSize ? shareicon24 : shareicon20;
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipient = await getRecipient(id);
        setRecipientData(recipient);
      } catch (error) {
        console.error('Error fetching recipient data:', error);
      }
    }

    fetchData();
  }, [id]);

  const fetchRecipientData = async () => {
    try {
      const recipient = await getRecipient(id);
      setRecipientData(recipient);
    } catch (error) {
      console.error('Error fetching recipient data:', error);
    }
  };

  const notify = (message) => toast.success(message);
  const copyURLToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => notify('URL이 복사되었습니다!'))
      .catch((error) => console.error('Failed to copy URL:', error));
  };

  useEffect(() => {
    window.Kakao.cleanup();
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_SDK_KEY);
  }, []);

  const shareKakao = () => {
    const currentURL = window.location.href;
    const postId = currentURL.substring(currentURL.lastIndexOf('/post/'));

    window.Kakao.Share.sendCustom({
      templateId: Number(import.meta.env.VITE_KAKAO_TEMPLATEID),
      templateArgs: {
        url: postId,
      },
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='header-post'>
      <div className='header-post__container'>
        {recipientData && (
          <div className='header-post__container_to-name'>To. {recipientData.name}</div>
        )}
        <div className='header-post__container_info'>
          {isDesktopSize && (
            <>
              <div className='header-post__container_info_person-wrapper'>
                {recipientData && (
                  <ProfileMessageCounter
                    count={recipientData.messageCount}
                    profiles={recipientData.recentMessages
                      .slice(0, 3)
                      .map((message) => message.profileImageURL)}
                    fetchData={fetchRecipientData} // 수정된 부분
                    displayOption='horizontal'
                  />
                )}
              </div>
              <img
                className='header-post__container_info_rectangle-1'
                src={rectangle}
                alt='가림막'
              />
            </>
          )}

          <div className='header-post__container_info_container'>
            <div className='header-post__container_info_container-emoji'>
              {recipientData && <Emojis recipientId={recipientData.id} />}
            </div>
            <img
              className='header-post__container_info_container_rectangle-2'
              src={rectangle}
              alt='가림막'
            />
            <div className='header-post__container_info_container_share'>
              <div
                ref={dropdownRef}
                className='header-post__container_info_container_share-dropdown'>
                <button
                  className='header-post__container_info_container_share-dropdown_btn'
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img src={shareicon} alt='페이지공유' />
                </button>
                {dropdownOpen && (
                  <ul className='header-post__container_info_container_share-dropdown_menu'>
                    <li className='sharekako' onClick={shareKakao}>
                      카카오톡 공유
                    </li>
                    <li className='shareurl' onClick={copyURLToClipboard}>
                      URL 공유
                    </li>
                  </ul>
                )}
                <ToastContainer
                  position='bottom-center'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={true}
                  pauseOnHover={false}
                  toastClassName='custom-toast'
                  theme='dark'
                  limit={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
