import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

const LinkButton = ({ to, buttonText, fullWidth }) => {
  const buttonClass = `link-button__button ${fullWidth ? 'full-width' : ''}`;
  return (
    <div className='link-button'>
      <Link to={to}>
        <button className={buttonClass}>{buttonText}</button>
      </Link>
    </div>
  );
};

export default LinkButton;