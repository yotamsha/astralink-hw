import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Base = ({ children }) => (
  <div>
    <div className="top-nav-bar">

      <div className="top-bar-left">
        <Link to="/"
              className={(location.pathname === '/' ? 'active' : '')}
        >Drawings</Link> |

        <Link to="/draw"
              className={(location.pathname === '/draw' ? 'active' : '')}

        >Create</Link>
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
