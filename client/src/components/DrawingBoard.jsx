import React, {PropTypes} from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';


class DrawingBoard extends React.Component {
  constructor(props){

    super(props);
    this.state = {};

  }

  componentDidMount() {
    let stage = this.refs.stage.getStage();
    let width = window.innerWidth - 50;
    let height = window.innerWidth / 2;
    // this.bindEvents(stage); // move this to page level
    // this.parentNode.clientWidth

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.props.onReady(stage);

  }

  updateDimensions() {
    //this.setState({width: window.innerWidth, height: window.innerWidth / 2});
  }

  bindEvents(stage) {
    let elm = this;
    stage.on('contentMousedown.proto', function() {
      elm.props.onMouseDown(stage);
    });
    stage.on('contentMousemove.proto', function() {
      elm.props.onMouseMove(stage);
    });
  }

  render() {
    return   (
      <Stage className="drawing-board" ref="stage" width={window.innerWidth} height={window.innerWidth / 2}/>
    );
  }
}


DrawingBoard.propTypes = {
  onReady: PropTypes.func.isRequired,
/*  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired*/
};

export default DrawingBoard;
