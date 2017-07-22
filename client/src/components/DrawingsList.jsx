import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

function beautifyTimeText(timeInSecs){
  var seconds = timeInSecs.toFixed(1);
  var minutes = (timeInSecs / (60)).toFixed(1);
  var hours = (timeInSecs / (60 * 60)).toFixed(1);
  if (seconds < 60) {
    return seconds + " Seconds";
  } else if (minutes < 60) {
    return minutes + " Minutes";
  } else {
    return hours + " Hours";
  }
}

function formatDate(date){
  return new Date(date).toDateString()
}
const DrawingsList = ({drawings}) => {
  var listItems = drawings.map(function(item) {
    var itemStyle = {backgroundColor: 'rgba(255, 255, 255, '+ (0.9 - Math.random() * 0.5) +')' }
    return (
    <Link key={item.id} to={'/drawing/' + item.id}>
      <li className="list-item" style={itemStyle}>

        <img className="drawing-preview" src={item.image}></img>
        <div className="meta-label duration">{beautifyTimeText(item.durationInSecs)}</div>
        <div className="meta-label created">{formatDate(item.createdAt)}</div>
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
