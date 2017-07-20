import React from 'react';
import User from '../modules/models/User';
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
    User.getInfo().then(function (data) {
      if (data){
        _this.setState({
          user: data.user
        });
      }

    });
  }

  /**
   * Render the component.
   */
  render() {
    return (<Base
      children={this.props.children}
      user={this.state.user}
      />);
  }

}

export default BaseContainer;
