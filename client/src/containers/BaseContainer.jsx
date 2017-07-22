import React from 'react';
import Base from '../components/Base.jsx';


class BaseContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var _this = this;
  }

  /**
   * Render the component.
   */
  render() {
    return (<Base
      children={this.props.children}
      />);
  }

}

export default BaseContainer;
