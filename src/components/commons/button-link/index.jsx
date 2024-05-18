import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss';

const ButtonLink = ({ to, buttonText, fullWidth, onClick, disabled }) => {
  const disabledClass = `${disabled ? `button-link--disabled` : ''}`;
  const fullWidthClass = `${fullWidth ? 'full-width' : ''}`;

  const buttonClasses = ['button-link__button', fullWidthClass, disabledClass]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='button-link'>
      <Link to={disabled ? '#' : to}>
        <button className={buttonClasses} onClick={disabled ? (e) => e.preventDefault() : onClick}>
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default ButtonLink;
