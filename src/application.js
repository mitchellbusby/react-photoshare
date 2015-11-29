import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './store/routes';
import history from './store/history';
import configureStore from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { SanitisedRoutes } from './store/routes';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import materialTheme from './utils/material-theme';

const store = configureStore({}, routes);

store.subscribe(() => {
  const state = store.getState();
  const currentUser = state.user.get('username');
  let currentPath;
  if (state.router !== null) {
    currentPath = state.router.location.pathname;
  } else {
    currentPath = '';
  }

  if (
    currentUser !== null ||
    SanitisedRoutes().indexOf(currentPath) > -1
  ) {
    history.pushState(null, currentPath);
  } else if (
    currentUser === null &&
    !(SanitisedRoutes().indexOf(currentPath) > -1)
  ) {
    history.pushState(null, '/login');
  }
});

@ThemeDecorator(materialTheme)
export default class Application extends React.Component {
  render() {
    return (
      <div>
        <Provider store={ store }>
          <ReduxRouter />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools
          store={ store }
          monitor={ LogMonitor }
          visibleOnLoad />
        </DebugPanel>
      </div>
      );
  }
}
Application.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
