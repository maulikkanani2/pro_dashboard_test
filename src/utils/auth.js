import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import Raven from 'raven-js';

import { getYurbiSessionToken } from './yurbi';

class CognitoAuth {
  constructor() {
    const poolData = {
      UserPoolId: window.config.cognito.userPoolId,
      ClientId: window.config.cognito.userPoolClientId,
      Region: window.config.cognito.region
    };

    this.userPool = new CognitoUserPool(poolData);
    this.user = null;
  }

  login(username, password, newPasswordRequired) {
    return new Promise((resolve, reject) => {
      const authData = {
        Username: username,
        Password: password
      };
      const authDetails = new AuthenticationDetails(authData);

      const userData = {
        Username: username,
        Pool: this.userPool
      };

      this.user = new CognitoUser(userData);
      this.user.authenticateUser(authDetails, {
        onSuccess: async (result) => {
          await this.setSession(username, result);
          resolve(result);
          Raven.setUserContext({ username });
        },
        newPasswordRequired() {
          newPasswordRequired();
        },
        onFailure(err) {
          Raven.captureException(err);
          reject(err);
        }
      });
    });
  }

  completeNewPasswordChallenge(newPassword) {
    return new Promise((resolve, reject) => {
      this.user.completeNewPasswordChallenge(newPassword, null, {
        onSuccess: async (result) => {
          await this.setSession(this.user.username, result);
          resolve(result);
        },
        onFailure(err) {
          Raven.captureException(err);
          reject(err);
        }
      });
    });
  }

  // eslint-disable-next-line
  logout() {
    return new Promise((resolve) => {
      if (localStorage.getItem('Username')) {
        const userData = {
          Username: localStorage.getItem('Username'),
          Pool: this.userPool
        };

        const cognitoUser = new CognitoUser(userData);
        cognitoUser.signOut();
      }

      localStorage.removeItem('Username');
      localStorage.removeItem('ApiToken');
      localStorage.removeItem('ApiTokenExpiry');
      localStorage.removeItem('YurbiSessionToken');
      localStorage.removeItem('Scenario');

      resolve();
    });
  }

  async setSession(username, result) {
    if (window.config.yurbi.enabled) {
      const payload = result.idToken.decodePayload();

      if (payload && payload['cognito:groups'] && payload['cognito:groups'][0]) {
        const token = await getYurbiSessionToken(payload['cognito:groups'][0], payload['cognito:groups'][0]);
        localStorage.setItem('YurbiSessionToken', token);
      }
    }

    localStorage.setItem('Username', username);
    localStorage.setItem('ApiToken', result.getIdToken().getJwtToken());
    localStorage.setItem('ApiTokenExpiry', result.getIdToken().getExpiration());
  }

  async refresh() {
    let result = new Promise((resolve, reject) => {
      const cognitoUser = this.userPool.getCurrentUser();
      if (cognitoUser !== null) {
         cognitoUser.getSession(function (err, oldsession) {
          if (!err) {
            const refresh_token = oldsession.getRefreshToken();
            cognitoUser.refreshSession(refresh_token, (err, session) => {
              if (err) {
                Raven.captureException(err);
              }
              else {
                localStorage.setItem('Username', localStorage.getItem('Username'));
                localStorage.setItem('ApiToken', session.getIdToken().getJwtToken());
                localStorage.setItem('ApiTokenExpiry', session.getIdToken().getExpiration());
                resolve();
              }
            });
          } else {
            reject(Error(err));
          }
        });
      } else {
        reject(Error('User not authicated!'));
      }
    });
    return await result;
  }

  async resetPassword(verificationCode, newPassword){
    return new Promise((resolve, reject) => {
      this.user.confirmPassword(verificationCode, newPassword,{
        onSuccess: async (result) => {
          resolve(result);
        },
        onFailure(err) {
          reject(err);
        }
      });
    });
  }
}

class DummyAuth {
  // eslint-disable-next-line
  login(username, password) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('Username', username);
      localStorage.setItem('ApiToken', 'testToken');
      localStorage.setItem('ApiTokenExpiry', 8640000000000);

      resolve();
    });
  }

  // eslint-disable-next-line
  logout(cb) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('Username');
      localStorage.removeItem('ApiToken');
      localStorage.removeItem('ApiTokenExpiry');
      localStorage.removeItem('Scenario');

      resolve();
    });
  }

  refresh() {
    return new Promise((resolve, reject) => {
      localStorage.setItem('Username', localStorage.getItem('Username'));
      localStorage.setItem('ApiToken', 'testToken');
      localStorage.setItem('ApiTokenExpiry', 8640000000000);

      resolve();
    });
  }

  completeNewPasswordChallenge() {
    return Promise.resolve();
  }
}

class Auth {
  constructor() {
    if (window.config.cognito.enabled) {
      this.authenticator = new CognitoAuth();
    } else {
      this.authenticator = new DummyAuth();
    }
  }

  // eslint-disable-next-line
  loggedIn() {
    return !!localStorage.getItem('ApiToken');
  }

  // eslint-disable-next-line
  tokenExpired() {
    const apiTokenExpiry = parseInt(localStorage.getItem('ApiTokenExpiry'), 10) * 1000;

    if (typeof(apiTokenExpiry) !== 'number' && Number.isNaN(apiTokenExpiry)) {
      return true;
    }

    return new Date(apiTokenExpiry) <= new Date();
  }

  getToken() {
    return localStorage.getItem('ApiToken');
  }

  login(username, password, newPasswordRequired) {
    return this.authenticator.login(username, password, newPasswordRequired);
  }

  completeNewPasswordChallenge(newPassword) {
    return this.authenticator.completeNewPasswordChallenge(newPassword);
  }

  logout() {
    return this.authenticator.logout();
  }
}

export default Auth;
