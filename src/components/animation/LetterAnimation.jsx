import React, { useState, useEffect } from 'react';
import './LetterAnimation.scss';

const LetterAnimation = () => {
  useEffect(() => {
    const container = document.querySelector('.falling-letter-container');
    const letters = document.querySelectorAll('.falling-letter');

    letters.forEach((letter, index) => {
      const delay = index * 200; // 순차적으로 떨어지도록 딜레이 설정
      const randomX = Math.random() * container.offsetWidth;
      const randomY = Math.random() * container.offsetHeight;

      setTimeout(() => {
        letter.style.left = `${randomX}px`;
        letter.style.top = `${randomY}px`;
      }, delay);
    });
  }, []);

  return (
    <div className='falling-letter-container'>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>🌸</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>🌸</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>🌸</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>🌸</div>
      <div className='falling-letter'>💌</div>
      <div className='falling-letter'>🌸</div>
      <div className='falling-letter'>💌</div>
    </div>
  );
};

export default LetterAnimation;
