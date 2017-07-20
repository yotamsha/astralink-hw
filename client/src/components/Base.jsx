import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-nav-bar">

      <div className="top-bar-left">
        <Link to="/">Home</Link> 

        <Link to="/draw">Create Your Own Drawing</Link>
      </div>
    </div>
    <div className="page-container">
      { /* child component will be rendered here */ }
      {children}
    </div>

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
