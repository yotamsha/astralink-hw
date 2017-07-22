import React, {PropTypes} from 'react';
import Utils from '../modules/services/Utils';
import FontIcon from 'material-ui/FontIcon';

const iconStyles = {
  fontSize: 30,
};

const DrawingItem = ({drawing}) => {
  if (drawing) {
    return (
      <div className="drawing-preview">
        <a className="download-link" download="drawing.png" href={drawing.image} title="Download">
          <FontIcon className="material-icons"
                    style={iconStyles}>file_download</FontIcon>

        </a>
        <img src={drawing.image}/>

        <div className="drawing-meta">
          <div className="meta-label duration">{Utils.beautifyTimeText(drawing.durationInSecs)}</div>
          <div className="meta-label created">{Utils.formatDate(drawing.createdAt)}</div>
        </div>
      </div>)
  } else {
    return null;
  }
};


DrawingItem.propTypes = {
  drawing: PropTypes.object.isRequired,

};

export default DrawingItem;
