
var profileImages = ['https://randomuser.me/api/portraits/women/50.jpg',
  'https://randomuser.me/api/portraits/women/76.jpg',
  'https://randomuser.me/api/portraits/men/82.jpg',
  'https://randomuser.me/api/portraits/men/66.jpg'
];
let _users = {};
// webpack doesn't like localStorage otherwise
let localStorage = global.window.localStorage;

function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function _populateUserData(user){
  user.profileImage = 'http://thecatapi.com/api/images/get?format=src&type=gif'; // random cat gifs :)
  user.password = _encode(user.password);
  return {
    user: user,
    positions: {
      fullName: {
        x: 290,
        y: 80
      },
      profileImage: {
        x: 60,
        y: 40
      }
    }
  };

}

function _encode(val) {
  return btoa(val);
}
function _decode(val) {
  return atob(val);
}
class FakeAPI {


  static init() {
    if (localStorage.users === undefined) {
      _users = {};
      localStorage.setItem('users', JSON.stringify(_users));
    } else {
      _users = JSON.parse(localStorage.getItem('users'));
    }
  }

  static login(username, password) {
    return new Promise(function(resolve, reject){
      if (_users[username] && _encode(password) === _users[username].user.password){
        // The user exists and the password fits.
        return resolve(_encode(username)); // generate a random token
      } else {
        return reject();
      }
    });
  }

  static setElementsPositions(token, elementsPositions) {
    var username = _decode(token);
    _users[username].positions = Object.assign({}, _users[username].positions, elementsPositions);
    return new Promise(function (resolve, reject) {
      localStorage.setItem('users', JSON.stringify(_users));
      resolve();
    });
  }

  static createUser(user) {
    return new Promise(function (resolve, reject) {
      if (!user || !user.username || !user.password || _users[user.username]){
        return reject();
      }
      _users[user.username] = _populateUserData(user);
      localStorage.setItem('users', JSON.stringify(_users));
      resolve();
    });
  }

  static getUserInfo(token) {
    return new Promise(function (resolve, reject) {
      var username = _decode(token);
      resolve(_users[username]);
    });
  }


}

FakeAPI.init();
export default FakeAPI;

