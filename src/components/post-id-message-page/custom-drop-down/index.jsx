import { forwardRef, useState, useEffect, useRef } from 'react';
import ArrowIcon from '../../../assets/icon/ic_arrow_down.svg';
import './CustomDropdown.scss';

function CustomDropdown({ props }, ref) {
  if (!props || props.length === 0) {
    return <p>No items available</p>; // 아이템이 없을 경우의 처리
  }
  const [selected, setSelected] = useState(props[0].text);
  const [active, setActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleClick = (e) => {
    const { innerText } = e.target;
    setSelected(innerText);
    ref.current = innerText;
  };

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className='message-form__inputs' ref={dropdownRef} onClick={handleToggle}>
      {selected}
      <img
        className={`message-form__arrow-icon ${active ? 'message-form__arrow-icon--active' : ''}`}
        alt='아래 방향 화살표 아이콘'
        src={ArrowIcon}
      />
      <div
        className={`message-form__drop-down-menu-box ${
          active ? 'message-form__drop-down-menu-box--down' : 'message-form__drop-down-menu-box--up'
        }`}
        onClick={handleClick}>
        {props.map((value) => {
          return (
            <div className='message-form__drop-down-menu' key={value.id}>
              {value.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default forwardRef(CustomDropdown);
