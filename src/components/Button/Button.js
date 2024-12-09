import React from 'react';
import './Button.css';

const Button = ({ children, onClick, styleType = 'primary' }) => {
  return (
    <button className={`button ${styleType}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
