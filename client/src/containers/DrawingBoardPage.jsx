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
    this.state = {
      drawing : {}
    };
    this.onReady = function(stage){
      _drawingBoardService = new DrawingBoardService(stage);
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


  /**
   * Render the component.
   */
  render() {
    return (
      <div className="drawing-board-page">
        <DrawingBoard
          onReady={this.onReady}
          onSave={this.saveDrawing}

        />
      </div>
    );
  }

}

DrawingBoardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DrawingBoardPage;
