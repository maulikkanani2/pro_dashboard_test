import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import Auth from '../utils/auth';
import { showAuthenticationDialog } from "../actions/dialogActions";
import configureStore from '../store/configureStore';

const store = configureStore();

const middleware = setContext((_, { headers }) => {
  const auth = new Auth();

  if (!auth.loggedIn() || auth.tokenExpired()) {
    if (auth.getToken()) {
      return auth.authenticator.refresh().then(() => {
        const token = localStorage.getItem('ApiToken');
        return {
          headers: {
            ...headers,
            Authorization: token ? token : '',
          },
        };
      }).catch((error) => {
        store.dispatch(showAuthenticationDialog())
        return false;
      })
    }else{
      store.dispatch(showAuthenticationDialog());
      return false;
    }
  }else{
    const token = localStorage.getItem('ApiToken');
    return {
      headers: {
        ...headers,
        Authorization: token ? token : '',
      },
    };
  }
});

export const cache = new InMemoryCache();

const getClient = () => {
  const httpLink = createHttpLink({
    uri: `${window.config.graphqlEndpoint}/graphql`,
  });

  return new ApolloClient({
    link: middleware.concat(httpLink),
    cache,
  });
};

export default getClient;
