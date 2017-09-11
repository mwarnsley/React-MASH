import React from 'react';
import {PageHeader} from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <PageHeader>
        <span className="m">M</span>
        <span className="a">A</span>
        <span className="s">S</span>
        <span className="h">H</span>
      </PageHeader>
      <div className="mash-description">
        <span className="m">Mansion</span>
        <span className="a">Apartment</span>
        <span className="s">Shack</span>
        <span className="h">House</span>
      </div>
    </div>
  );
};

export default Header;
