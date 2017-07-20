import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">

      <div className="top-bar-left">
      </div>
      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">

          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
        </div>
      )}

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
