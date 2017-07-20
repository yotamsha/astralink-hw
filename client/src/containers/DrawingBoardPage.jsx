import React, { PropTypes } from 'react';
import DrawingBoardService from '../modules/services/DrawingBoardService';

import DrawingBoard from '../components/DrawingBoard.jsx';


class DrawingBoardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

/*
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
*/

    // set the initial component state
    this.state = {};
/*    this.onMouseDown = DrawingBoardService.onMouseDown;
    this.onMouseMove = DrawingBoardService.onMouseMove;
    this.onMouseUp = DrawingBoardService.onMouseUp;*/
    this.onReady = function(stage){
      
      var drawingBoardService = new DrawingBoardService(stage);
      //drawingBoardService.init(stage);

    }

/*    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);*/
  }

/*
  /!**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   *!/
  processForm(event) {
    var _this = this;
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const username = encodeURIComponent(_this.state.user.username);
    const password = encodeURIComponent(_this.state.user.password);
    User.login(username, password).then(function authSuccess(){
      _this.context.router.replace('/');
      //this.changeUser();
    }, function authError(error){
      _this.setState({
      errors : {
        summary : 'Please check credentials and try again.'
      }
      });
    });
  }

  /!**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   *!/
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
*/

  /**
   * Render the component.
   */
  render() {
    return (
      <div className="drawing-board-page">
        <DrawingBoard
          onReady={this.onReady}
        />
      </div>
    );
  }

}

DrawingBoardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DrawingBoardPage;
