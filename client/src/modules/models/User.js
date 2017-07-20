import Auth from '../Auth';
import fakeAPI from '../FakeAPI';

let _cachedUser = null;

class User {

  /**
   * Create a login request.
   *
   * @param {string} username
   * @param {string} password
   */
  static login(username, password) {
    //localStorage.setItem('token', token);
    return new Promise(function(resolve, reject){
      if (Auth.isUserAuthenticated()){
        return resolve();
      } else {
        return fakeAPI.login(username, password).then(function authSuccess(token){
          // success
          Auth.authenticateUser(token);
          _cachedUser = null;
          return resolve();
        }, function authError(){
          //error
          return reject();

        });
      }
    });

  }

  static register(user) {
    return fakeAPI.createUser(user);
  }

  static getInfo(){
    return new Promise(function(resolve, reject){
      if (_cachedUser){
        resolve(_cachedUser);
      }
      fakeAPI.getUserInfo(Auth.getToken()).then(function(user){
        _cachedUser = user;
        resolve(user);
      }, function(){
        reject();
      });
    });

  }

  static setElementsPositions(positions) {
    return fakeAPI.setElementsPositions(Auth.getToken(), positions);
  }

}

export default User;
