import React from 'react';
import {map} from 'lodash';
import List from './List';

const ListContainer = ({question, onChange}) => {
  const listItems = map(question.inputs, (q, i) => {
    return <List key={i} number={q.id} id={q.id} value={q.value} onChange={onChange} />;
  });
  return (
    <div className="list-container">
      <h1 className="list-title">{question.title}</h1>
      {listItems}
    </div>
  );
};

export default ListContainer;
