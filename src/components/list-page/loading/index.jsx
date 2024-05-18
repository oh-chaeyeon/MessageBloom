import './Loading.scss';

import React from 'react';

export default function Loading() {
  return (
    <div className='loading-card'>
      <div className='loading-card__text-wrap'>
        <div className='loading-card__to animation'></div>
        <div className='loading-card__profiles animation'></div>
        <div className='loading-card__counter  animation'></div>
      </div>
      <div className='loading-card__emoji-container'>
        <div className='loading-card__divider'></div>
        <div className='loading-card__emoji-wrap'>
          <div className='loading-card__emoji animation'></div>
          <div className='loading-card__emoji animation'></div>
          <div className='loading-card__emoji animation'></div>
        </div>
      </div>
    </div>
  );
}
