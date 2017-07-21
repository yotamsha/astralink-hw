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
      lineWidth : 5
    };
    this.state = {
      drawing : {},
      paintProps: defaultPaintProps
    };
    this.onReady = function(stage){
      _drawingBoardService = new DrawingBoardService(stage, defaultPaintProps);
    }
    this.saveDrawing = this.saveDrawing.bind(this);
  }

  saveDrawing() {
    let _this = this;
    let drawing = Object.assign({},_this.state.drawing, {
      image: _drawingBoardService.getDrawingData().image
    });
    Drawing.save(drawing).then(function(result){
      _this.setState({
        drawing: result
      });
    })
  }

  paintPropsChanged(newPaintProps) {
    _drawingBoardService.updatePaintProps(newPaintProps);
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

        />
      </div>
    );
  }

}

DrawingBoardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DrawingBoardPage;
