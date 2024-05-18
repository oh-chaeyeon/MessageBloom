import React, { useState } from 'react';
import './WritersProfiles.scss';

const mock = {
  id: 2639,
  name: '무한매력_율민',
  backgroundColor: 'blue',
  backgroundImageURL: null,
  createdAt: '2024-01-31T07:33:45.854622Z',
  messageCount: 2,
  recentMessages: [
    {
      id: 4826,
      recipientId: 2639,
      sender: '1',
      profileImageURL: 'https://picsum.photos/id/547/100/100',
      relationship: '지인',
      content: '<p>http://localhost:3000/post/2517http://localhost:3000/post/2517</p>',
      font: 'Noto Sans',
      createdAt: '2024-01-31T15:30:37.110094Z',
    },
    {
      id: 4817,
      recipientId: 2639,
      sender: 'ㅁㄴㅇㄹㄴㅁㅇㄹ',
      profileImageURL: 'https://picsum.photos/id/494/100/100',
      relationship: '동료',
      content:
        '<p><img src="data:image/png;base64,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"></p>',
      font: 'Noto Sans',
      createdAt: '2024-01-31T15:27:21.834503Z',
    },
  ],
  reactionCount: 9,
  topReactions: [
    {
      id: 2509,
      emoji: '🤣',
      count: 5,
    },
    {
      id: 2505,
      emoji: '😶‍🌫️',
      count: 1,
    },
    {
      id: 2506,
      emoji: '🤩',
      count: 1,
    },
  ],
};

export default function WritersProfiles() {
  const [data, setData] = useState(mock);

  return (
    <div className='list-card__writers__profiles'>
      <div className='list-card__writers__profiles-img'>
        <img
          className='list-card__writers__profiles-img1'
          src={data.recentMessages[0].profileImageURL}
          alt='이미지'
        />
      </div>
      <div className='list-card__writers__profiles-img'>
        <img
          className='list-card__writers__profiles-img2'
          src={data.recentMessages[1].profileImageURL}
          alt='이미지'
        />
      </div>
      <div className='list-card__writers__profiles-img'>
        <img
          className='list-card__writers__profiles-img3'
          src={data.recentMessages[1].profileImageURL}
          alt='이미지'
        />
      </div>
      <div className='list-card__writers__profiles-count'>+{data.messageCount}</div>
    </div>
  );
}
