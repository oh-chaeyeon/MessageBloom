import { PROFILES } from '../../../utils/post-id-message/postMessagePageConstants';
import { forwardRef, useState } from 'react';
import basicImg from '../../../assets/image/profile/img_profile_basic.svg';
import './ProfileOptions.scss';

function ProfileOptions(_, profileOptionsRef) {
  const [selectedImg, setSelected] = useState(basicImg);
  const handleProfileClick = (e) => {
    const profile = e.target.src;
    if (profile) {
      profileOptionsRef.current.value = profile;
      setSelected(profile);
    }
  };

  return (
    <div className='message-form__profile'>
      <span className='message-form__title'>프로필 이미지</span>
      <div className='message-form__profile-container'>
        <img
          className='message-form__profile--selected'
          src={selectedImg}
          alt='선택된 프로필 이미지'
        />
        <div className='message-form__profile-options'>
          <p className='message-form__profile-options-title'>프로필 이미지를 선택해주세요!</p>
          <div className='message-form__profile-preview-container' onClick={handleProfileClick}>
            {PROFILES.map((profile, i) => {
              return (
                <img
                  key={i}
                  className='message-form__profile--preview'
                  src={profile.src}
                  alt={profile.alt}
                  ref={profileOptionsRef}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(ProfileOptions);
