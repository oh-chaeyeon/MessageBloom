import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './DropDownEmojis.scss';
import arrowDownIcon from '../../../assets/icon/ic_arrow_down.svg';
import addicon20 from '../../../assets/icon/ic_add_20.svg';
import addicon24 from '../../../assets/icon/ic_add_24.svg';
import { addReaction, getReactions } from '../../../apis/api';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '../../../utils/windowWidthConstants';

export default function DropDownEmojis({ recipientId }) {
  const [emojiSets, setEmojiSets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const topEmojis = emojiSets.sort((a, b) => b.count - a.count).slice(0, 3);
  const windowWidth = useWindowWidth();
  const maxIcons = windowWidth >= DESKTOP_WIDTH ? 8 : 6;
  const addicon = windowWidth >= TABLET_WIDTH ? addicon24 : addicon20;
  const dropdownRef = useRef(null);

  useEffect(() => {
    (async () => setEmojiSets((await getReactions(recipientId)).results))();
  }, [recipientId]);

  const handleEmojiClick = (emojiData) => {
    addReaction(recipientId, emojiData.emoji, 'increase').then((response) => {
      setEmojiSets((prevEmojiSets) => {
        const existingEmoji = prevEmojiSets.find((set) => set.emoji === emojiData.emoji);
        if (existingEmoji) {
          return prevEmojiSets.map((set) =>
            set.emoji === emojiData.emoji ? { ...set, count: set.count + 1 } : set,
          );
        } else {
          const newEmojiSet = {
            id: response.id,
            emoji: emojiData.emoji,
            count: 1,
          };
          return [...prevEmojiSets, newEmojiSet];
        }
      });
    });
  };

  const toggleDropDown = () => {
    if (emojiSets.length > 0) {
      setIsOpen(!isOpen);
      setShowPicker(false);
    }
  };

  const togglePicker = () => {
    setShowPicker((prevState) => {
      if (isOpen) {
        setIsOpen(false);
      }
      return !prevState;
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='headeremojis' ref={dropdownRef}>
      <div className='headeremojis-container'>
        <button className='headeremojis-container__dropdown'>
          <div>
            {topEmojis.length === 0 && (
              <div className='headeremojis-container__dropdown__no-data'>
                <span>이모티콘을 남겨주세요!</span>
              </div>
            )}
          </div>
          <div className='headeremojis-container__dropdown__popular'>
            {topEmojis.map((set, index) => (
              <span key={index} className='headeremojis-container__dropdown__popular-emoji'>
                {set.emoji}
                <span className='headeremojis-container__dropdown__popular-emoji-text'>
                  {set.count}
                </span>
              </span>
            ))}
          </div>
          <img
            src={arrowDownIcon}
            alt='Dropdown'
            className='headeremojis-container__dropdown-icon'
            onClick={toggleDropDown}
          />
        </button>

        {isOpen && (
          <div className='headeremojis-container__dropdown-container'>
            <div className='headeremojis-container__dropdown-container_menu'>
              {emojiSets
                .slice(0)
                .sort((a, b) => b.count - a.count)
                .slice(0, maxIcons)
                .map((set, index) => (
                  <div
                    key={index}
                    className='headeremojis-container__dropdown-container_menu-emoji'>
                    <span>{set.emoji}</span>
                    <span className='headeremojis-container__dropdown-container_menu-emoji-text'>
                      {set.count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          className='headeremojis__add-btn'
          onClick={togglePicker}
          style={{ cursor: 'pointer' }}>
          <img src={addicon} className='headeremojis__add-btn-icon' alt='이모지추가' />
          <span
            className='headeremojis__add-btn-text'
            style={{ display: windowWidth >= 768 ? 'inline' : 'none' }}>
            추가
          </span>
        </button>
        <div className='headeremojis__emojipicker'>
          {showPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              className='headeremojis__emojipicker-container'
              width={300}
              height={500}
            />
          )}
        </div>
      </div>
    </div>
  );
}
