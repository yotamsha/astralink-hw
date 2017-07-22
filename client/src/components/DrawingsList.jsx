import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import Utils from '../modules/services/Utils';

const DrawingsList = ({drawings}) => {
  var listItems = drawings.map(function(item) {
    var itemStyle = {backgroundColor: 'rgba(255, 255, 255, '+ (0.9 - Math.random() * 0.5) +')' }
    return (
    <Link key={item.id} to={'/drawing/' + item.id}>
      <li className="list-item" style={itemStyle}>

        <img className="drawing-preview" src={item.image}></img>
        <div className="meta-label duration">{Utils.beautifyTimeText(item.durationInSecs)}</div>
        <div className="meta-label created">{Utils.formatDate(item.createdAt)}</div>
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
