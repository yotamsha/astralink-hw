import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Layer, Rect, Stage, Group} from 'react-konva';
import { GithubPicker } from 'react-color';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import Consts from '../modules/services/Consts';

let _defaultColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB','#000000']

function _getDrawinLinkById(id){
  return window.location.host + '/drawing/' + id
}
class DrawingBoard extends React.Component {
  constructor(props){

    super(props);
    this.state = {};
    this.onColorChanged = this.onColorChanged.bind(this);
    this.lineWidthChanged = this.lineWidthChanged.bind(this);

  }

  componentDidMount() {
    let stage = this.refs.stage.getStage();
    this.props.onReady(stage);
  }

  onColorChanged(color, event) {
    this.props.paintPropsChanged({color: color.hex});
  }

  lineWidthChanged(event, width) {
    this.props.paintPropsChanged({lineWidth: width});
  }

  modeChanged(mode) {
    this.props.paintPropsChanged({mode: mode});
  }

  render() {
    return   (
      <div>
        <div className="control-panel panel">
          <div className="panel-section">
            <label>Brush Color</label>
            <GithubPicker colors={_defaultColors} onChange={ this.onColorChanged } color={ this.props.paintProps.color } />

          </div>
          <div className="panel-section">
            <label>Brush width</label>
            <Slider step={1} min={1} value={this.props.paintProps.lineWidth}
                    max={10} onChange={this.lineWidthChanged} />
          </div>
          <div className="panel-section">
            <label>Mode</label>
            <button onClick={() => this.modeChanged(Consts.BRUSH_MODES.BRUSH)}
                    className={'icon-button ' + (this.props.paintProps.mode === Consts.BRUSH_MODES.BRUSH ? 'active' : '')}
                    title="Brush">
              <FontIcon className="material-icons">brush</FontIcon>
            </button>
            <button onClick={() => this.modeChanged(Consts.BRUSH_MODES.ERASER)}
                    className={'icon-button ' + (this.props.paintProps.mode === Consts.BRUSH_MODES.ERASER ? 'active' : '')}
                    title="Eraser" >
              <FontIcon className="material-icons">crop_5_4</FontIcon>

            </button>

          </div>
        </div>
        <div className="actions-panel panel">
          <button onClick={() => this.props.onSave(Consts.SAVE_MODES.PUBLIC)}>Publish</button>
          <button onClick={() => this.props.onSave(Consts.SAVE_MODES.PRIVATE)}>Share Link Privately</button>
          <Link className={'link-cont ' + ((!this.props.drawing.id) ? 'hide-element' : '')}
                to={'/drawing/' + this.props.drawing.id}>
            {_getDrawinLinkById(this.props.drawing.id)}</Link>
        </div>
        <Stage className="drawing-board" ref="stage"/>
      </div>
    );
  }
}


DrawingBoard.propTypes = {
  onReady: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  paintProps: PropTypes.object.isRequired,
  paintPropsChanged: PropTypes.func.isRequired,
  drawing: PropTypes.object.isRequired
};

export default DrawingBoard;
