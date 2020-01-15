const getYurbiSessionToken = async (username, password) => {
  try {
    const response = await fetch(
      `${window.config.analyticsUrl}/yurbimidtier/api/login/DoLogin`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bolForceLogin: true,
          UserId: username,
          UserPassword: password,
          isGuest: false,
        }),
      }
    );
    const responseJson = await response.json();
    return responseJson.LoginSession.SessionToken;
  } catch (error) {
    console.log('Unable to authenticate with Yurbi', error);
  }
};

// eslint-disable-next-line
export { getYurbiSessionToken };
