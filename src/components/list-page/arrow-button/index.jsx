import React from 'react';
import './ArrowButton.scss';

import ic_arrow_left from '../../../assets/icon/ic_arrow_left.svg';
import ic_arrow_right from '../../../assets/icon/ic_arrow_right.svg';

export function ArrowButtonLeft({ onClick }) {
  return (
    <div className='arrow-button__container'>
      <button className='arrow-button left' onClick={onClick}>
        <img src={ic_arrow_left} alt='왼쪽으로 클릭'></img>
      </button>
    </div>
  );
}

export function ArrowButtonRight({ onClick }) {
  return (
    <div className='arrow-button__container'>
      <button className='arrow-button right' onClick={onClick}>
        <img src={ic_arrow_right} alt='왼쪽으로 클릭'></img>
      </button>
    </div>
  );
}
