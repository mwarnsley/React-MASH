import React from 'react';

const Button = ({type, classes, id, onClick, name, disabled, btnText}) => {
  return (
    <button type={type} className={classes} id={id} onClick={onClick} name={name} disabled={disabled}>
      {btnText}
    </button>
  );
};

export default Button;
