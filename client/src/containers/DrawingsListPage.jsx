import React from 'react';
import Drawing from '../modules/models/Drawing';
import DrawingsList from '../components/DrawingsList.jsx';

class DrawingsListPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      drawings: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var _this = this;
    Drawing.getAll().then(function (data) {
      _this.setState({
        drawings: data
      });
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (<div className="drawings-list-page">
      <DrawingsList
        drawings={this.state.drawings}
      />
    </div>);
  }

}

export default DrawingsListPage;
