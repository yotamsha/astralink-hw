import React, { PropTypes } from 'react';
import DrawingBoardService from '../modules/services/DrawingBoardService';
import DrawingBoard from '../components/DrawingBoard.jsx';
import Drawing from '../modules/models/Drawing';

let _drawingBoardService;
class DrawingBoardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    // set the initial component state
    const defaultPaintProps = {
      color: '#000000',
      lineWidth : 5,
      mode: 'brush'
    };
    this.state = {
      drawing : {},
      paintProps: defaultPaintProps
    };
    this.onReady = function(stage){
      _drawingBoardService = new DrawingBoardService(stage, defaultPaintProps);
    }
    this.saveDrawing = this.saveDrawing.bind(this);
    this.paintPropsChanged = this.paintPropsChanged.bind(this);
  }

  saveDrawing(saveMode) {
    let _this = this;
    _drawingBoardService.stopDrawingTime();
    let drawing = Object.assign({},_this.state.drawing, _drawingBoardService.getDrawingData());
    drawing.saveMode = saveMode;
    Drawing.save(drawing).then(function(result){
      _this.setState({
        drawing: result
      });
    })
  }

  paintPropsChanged(newPaintProps) {
    let _this = this;
    _drawingBoardService.updatePaintProps(newPaintProps);
    _this.setState({
      paintProps: Object.assign({},this.state.paintProps,newPaintProps)
    });
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div className="drawing-board-page">
        <DrawingBoard
          onReady={this.onReady}
          onSave={this.saveDrawing}
          paintProps={this.state.paintProps}
          paintPropsChanged={this.paintPropsChanged}
          drawing={this.state.drawing}
        />
      </div>
    );
  }

}

DrawingBoardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DrawingBoardPage;
