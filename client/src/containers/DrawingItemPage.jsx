import React, { PropTypes } from 'react';
import Drawing from '../modules/models/Drawing';
import DrawingItem from '../components/DrawingItem.jsx';

class DrawingItemPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    // set the initial component state
    this.state = {
      drawing : {}
    };
    this.getDrawing = this.getDrawing.bind(this);
  }

  componentDidMount() {
    var _this = this;
    _this.getDrawing();
  }

  getDrawing() {
    let _this = this;
    Drawing.getById(_this.props.params.drawingId).then(function(result){
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
      <div className="drawing-view-page">
        <DrawingItem
          drawing={this.state.drawing}
        />
      </div>
    );
  }

}

DrawingItemPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DrawingItemPage;
