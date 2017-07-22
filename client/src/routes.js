import Base from './components/Base.jsx';
import BaseContainer from './containers/BaseContainer.jsx';
import DrawingBoardPage from './containers/DrawingBoardPage.jsx';
import DrawingsListPage from './containers/DrawingsListPage.jsx';
import DrawingItemPage from './containers/DrawingItemPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: BaseContainer,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        /*if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, LoginPage);
        }*/
        callback(null, DrawingsListPage);

      }
    },

    {
      path: '/draw',
      component: DrawingBoardPage
    },

    {
      path: '/drawing/:drawingId',
      component: DrawingItemPage
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;
