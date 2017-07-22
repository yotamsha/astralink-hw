import Base from './components/Base.jsx';
import BaseContainer from './containers/BaseContainer.jsx';
import DrawingBoardPage from './containers/DrawingBoardPage.jsx';
import DrawingsListPage from './containers/DrawingsListPage.jsx';
import DrawingItemPage from './containers/DrawingItemPage.jsx';


const routes = {
  // base component (wrapper for the whole application).
  component: BaseContainer,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
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
    }

  ]
};

export default routes;
