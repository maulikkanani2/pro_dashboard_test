import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import getClient from './graphql/client';
import Box from './components/layout/Box';
import Page from './components/layout/Page';
import MainNav from './components/navigation/MainNav';
import Scenarios from './pages/Scenarios';
import configureStore from './store/configureStore';
import ScenarioContextLayout from './layouts/ScenarioContextLayout';
import ScenarioSchedule from './pages/Schedule';
import Users from './pages/Users';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Auth from './utils/auth';
import LoginDialog from "./pages/loginDialog";
import { showAuthenticationDialog } from "./actions/dialogActions";

import './assets/css/scrollbar.css';
import './assets/css/sweetalert2.css';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1181FF',
      main: '#0079FF',
      dark: '#0056B6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#354052',
      contrastText: '#fff',
    },
  },
});

const App = () => {
  return (
    <ApolloProvider client={getClient()}>
      <ReduxProvider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <LoginDialog />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
              <Page>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route path="/" render={() => {
                    const auth = new Auth();

                    if (!auth.loggedIn() || auth.tokenExpired()) {
                      if (auth.getToken()) {
                        auth.authenticator.refresh().then(() => {
                        }).catch((error) => {
                          store.dispatch(showAuthenticationDialog())
                        })
                      } else {
                        auth.logout();
                        return <Redirect from="/" to="/login" />;
                      }
                    }

                    return (
                      <Switch>
                        <Route exact path="/scenarios/:id/schedule/readonly">
                          <ScenarioSchedule isReadOnly={true} />
                        </Route>
                        <Route exact path="/scenarios/:id/schedule/undock">
                          <ScenarioSchedule isUndocked={true} />
                        </Route>
                        <Route>
                          <Box fit>
                            <MainNav />
                            <Switch>
                              <Route path="/scenarios/:id" component={ScenarioContextLayout} />
                              <Route path="/scenarios" component={Scenarios} />
                              <Route path="/analytics" component={Analytics} />
                              <Route path="/about" component={About} />
                              <Route path="/users" component={Users} />
                              <Redirect to="/scenarios" />
                            </Switch>
                          </Box>
                        </Route>
                      </Switch>
                    )
                  }} />
                </Switch>
              </Page>
            </Router>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App;
