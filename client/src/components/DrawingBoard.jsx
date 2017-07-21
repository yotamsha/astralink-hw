import React, {PropTypes} from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import { GithubPicker } from 'react-color';
import Slider from 'material-ui/Slider';

let _defaultColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB','#000000']

class DrawingBoard extends React.Component {
  constructor(props){

    super(props);
    this.state = {};
    this.onColorChanged = this.onColorChanged.bind(this);
    this.lineWidthChange = this.lineWidthChange.bind(this);

  }

  componentDidMount() {
    let stage = this.refs.stage.getStage();
/*    let width = window.innerWidth - 50;
    let height = window.innerWidth / 2;
    // this.bindEvents(stage); // move this to page level
    // this.parentNode.clientWidth

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.props.onReady(stage);*/
    this.props.onReady(stage);
  }

  updateDimensions() {
    //this.setState({width: window.innerWidth, height: window.innerWidth / 2});
  }

  onColorChanged(color, event) {
    console.log("color picked: " ,color.hex);
    this.props.paintPropsChanged({color: color.hex});
  }

  lineWidthChange(event, width) {
    console.log("slider picked: " ,width);
    this.props.paintPropsChanged({lineWidth: width});
  }


  render() {
    return   (
      <div>
        <div className="control-panel">
          <GithubPicker colors={_defaultColors} onChange={ this.onColorChanged } color={ this.props.paintProps.color } />
          <Slider step={1} min={1} value={this.props.paintProps.lineWidth}
                  max={10} onChange={this.lineWidthChange} />
          <button onClick={this.props.onSave}>Save</button>

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
/*  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired*/
};

export default DrawingBoard;
