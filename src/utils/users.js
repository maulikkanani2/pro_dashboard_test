import Swal from 'sweetalert2';

class Users {
  constructor () {
    const config = {
      UserPoolId: window.config.cognito.userPoolId,
      Region: window.config.cognito.region,
    };
    this.config = config;
    this.token = localStorage.get;
    this.apiUrl = window.config.iamEndpoint;
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem ('ApiToken'),
    };
  }

  displaySwal (data) {
    if (data.type === 'success') {
      if (data.type === 'success') {
        Swal ({
          position: 'top',
          title: 'Success',
          toast: true,
          showConfirmationButton: false,
          confirmButtonColor: '#0079FF',
          timer: 5000,
        });
      }
    }

    if (data.type === 'error') {
      Swal ({
        position: 'top',
        title: 'Error',
        toast: true,
        showConfirmationButton: false,
        confirmButtonColor: '#0079FF',
        timer: 5000,
      });
    }
  }

  apiRequest (url, data) {
    Object.assign (this.config, data);
    return fetch (url, {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify (this.config),
    })
      .then (function (response) {
        try {
          return response.json ();
        } catch (err) {
          return {};
        }
      })
      .catch (function (error) {
        throw error;
        Swal ({
          position: 'top',
          title: 'Error',
          text: error.message,
          toast: true,
          showConfirmationButton: false,
          confirmButtonColor: '#0079FF',
          timer: 5000,
        });
      });
  }

  listUsers (request = {}) {
    return this.apiRequest (`${this.apiUrl}/users`, request);
  }

  updateUser (request = {}) {
    return this.apiRequest (`${this.apiUrl}/user/edit`, request).then (data =>
      this.displaySwal (data)
    );
  }

  deleteUser (request = {}) {
    return this.apiRequest (`${this.apiUrl}/user/delete`, request).then (data =>
      this.displaySwal (data)
    );
  }

  disableUser (request = {}) {
    return this.apiRequest (
      `${this.apiUrl}/user/disable`,
      request
    ).then (data => this.displaySwal (data));
  }

  activateUser (request = {}) {
    return this.apiRequest (`${this.apiUrl}/user/enable`, request).then (data =>
      this.displaySwal (data)
    );
  }

  resetPassword (request = {}) {
    return this.apiRequest (`${this.apiUrl}/user/reset`, request).then (data =>
        this.displaySwal (data)
    );
  }
}

export default Users;
