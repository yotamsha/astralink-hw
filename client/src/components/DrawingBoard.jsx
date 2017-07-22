import React, {PropTypes} from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import { GithubPicker } from 'react-color';
import Slider from 'material-ui/Slider';
import Consts from '../modules/services/Consts';

let _defaultColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB','#000000']

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
        <div className="control-panel">
          <GithubPicker colors={_defaultColors} onChange={ this.onColorChanged } color={ this.props.paintProps.color } />
          <Slider step={1} min={1} value={this.props.paintProps.lineWidth}
                  max={10} onChange={this.lineWidthChanged} />
          <button onClick={() => this.modeChanged(Consts.BRUSH_MODES.ERASER)}>Eraser On</button>
          <button onClick={() => this.modeChanged(Consts.BRUSH_MODES.BRUSH)}>Brush On</button>


        </div>
        <div className="actions-panel">
          <button onClick={() => this.props.onSave(Consts.SAVE_MODES.PUBLIC)}>Pu</button>
          <button onClick={() => this.props.onSave(Consts.SAVE_MODES.PRIVATE)}>Share Link Privately</button>
        </div>
        <Stage className="drawing-board" ref="stage"/>
      </div>
    );
    // width={this.props.containerDimensions.width} height={this.props.containerDimensions.height}
  }
}


DrawingBoard.propTypes = {
  onReady: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  paintProps: PropTypes.object.isRequired,
  paintPropsChanged: PropTypes.func.isRequired
};

export default DrawingBoard;
