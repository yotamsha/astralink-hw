import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';


const DrawingsList = ({drawings}) => {
  var listItems = drawings.map(function(item) {
    var itemStyle = {opacity: (0.9 - Math.random() * 0.7)}
    return (
    <Link key={item.id} to={'/drawing/' + item.id}>
      <li className="list-item" style={itemStyle}>
        id: {item.id}
        <img className="drawing-preview" src={item.image}></img>
      </li>
    </Link>


    );
  });
  return ( <div className="drawings-list">
      <ul className="">
        {listItems}
      </ul>
    </div>
  )
};


DrawingsList.propTypes = {
  drawings: PropTypes.array.isRequired,

};

export default DrawingsList;
