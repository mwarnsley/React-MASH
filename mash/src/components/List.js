import React from 'react';
import {FormControl} from 'react-bootstrap';

const List = ({number, onChange, id, value}) => {
  const changeInput = e => {
    onChange(e);
  };
  return (
    <div className="list">
      <span className="list-number">{number}. </span>
      <FormControl type="text" data-id={id} className="list-input" value={value} onChange={e => changeInput(e)} />
    </div>
  );
};

export default List;
