import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';


const DrawingItem = ({drawing}) => {
   if (drawing) {
     return (<div className="drawing-preview">
              <img src={drawing.image}/>
             </div>)
   }  else {
     return null;
   }
};


DrawingItem.propTypes = {
  drawing: PropTypes.object.isRequired,

};

export default DrawingItem;
