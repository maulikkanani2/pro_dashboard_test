import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import VBox from '../components/layout/VBox';
import Auth from '../utils/auth';
import Box from '../components/layout/Box';

import backgroundImage from '../assets/img/login-background.jpg';
import logo from '../assets/img/logo-white-text.svg';
import '../assets/css/login.css';
import ResetPasswordDialog from '../components/user/reset-password-dialog';
import RequestPasswordDialog from '../components/user/request-password-dialog';

const styles = theme => ({
  root: {
    overflow: 'auto',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'fixed',
      left: 0,
      right: 0,
      zIndex: -1,
      display: 'block',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%'
    }
  },
  paper: {
    width: 400,
    height: 450
  },
  logoWrapper: {
    height: 100,
    background: 'rgb(53, 64, 82)'
  },
  logo: {
    height: 90
  },
  body: {
    padding: theme.spacing.unit * 3
  },
  field: {
    marginBottom: theme.spacing.unit * 2
  },
  loginButton: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3
  },
  forgotPasswordText: {
    fontWeight: 500,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  helpText: {
    fontWeight: 500,
    color: '#c4c4c4',
    fontSize: '0.8rem',
    '&:hover': {
      color: '#a2a2a2'
    }
  },
  hr: {
    width: '100%'
  },
  link: {
    textDecoration: 'none'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', userAttributes: null, openDialog: false, loading: false, openRequestDialog: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.auth = new Auth();
  }

  login(username, password) {
    this.auth.login(username, password, () => this.setState({ openDialog: true }))
        .then(() => this.props.history.push('/'))
        .catch((err) => {
          Swal({
            position: 'top',
            title: 'Error',
            text: err.message,
            toast: true,
            showConfirmationButton: false,
            confirmButtonColor: '#0079FF',
            timer: 5000
          });
          this.setState({ openDialog: false, loading: false });
          if(err.code === "PasswordResetRequiredException")
            this.setState({ openRequestDialog: true });
        });
  }

  handleChange = (fieldName) => {
    return (event) => {
      this.setState({ [fieldName]: event.target.value });
    };
  };

  handleLogin = () => {
    const { username, password } = this.state;

    this.login(username, password);
  };

  resetPassword = (newPassword) => {
    this.auth.completeNewPasswordChallenge(newPassword)
        .then(() => this.props.history.push('/'))
        .catch(err => {
          Swal({
            position: 'top',
            title: 'Error',
            text: err.message,
            toast: true,
            showConfirmationButton: false,
            confirmButtonColor: '#0079FF',
            timer: 5000
          });
          this.setState({ loading: false })
        });
  };

  requestPassword = (code, newPassword) => {
    this.setState({ loading: true });
    this.auth.authenticator.resetPassword(code, newPassword)
        .then( () => {
          Swal({
            position: 'top',
            title: 'Success',
            text: 'Password reset successfully.',
            toast: true,
            showConfirmationButton: false,
            confirmButtonColor: '#0079FF',
            timer: 5000
          });

        } )
        .catch( err => {
          Swal({
            position: 'top',
            title: 'Error',
            text: err.message,
            toast: true,
            showConfirmationButton: false,
            confirmButtonColor: '#0079FF',
            timer: 5000
          });
        });
        this.setState({ openRequestDialog:false,loading: false })
  }

  render() {
    return (
        <VBox fit center className={this.props.classes.root}>
          <Paper className={this.props.classes.paper}>
            <Box className={this.props.classes.logoWrapper} center>
              <img src={logo} alt="Ailytic" className={this.props.classes.logo} />
            </Box>
            <VBox center className={this.props.classes.body}>
              <TextField
                  className={this.props.classes.field}
                  label="Username"
                  fullWidth
                  InputLabelProps={{ id: 'usernameFieldLabel' }}
                  value={this.state.username}
                  onChange={this.handleChange('username')} />
              <TextField
                  InputLabelProps={{ id: 'passwordFieldLabel' }}
                  label="Password"
                  type="password"
                  fullWidth
                  value={this.state.password}
                  onChange={this.handleChange('password')} />
              <Button
                  className={this.props.classes.loginButton}
                  fullWidth
                  onClick={this.handleLogin}
                  variant="raised"
                  color="primary">
                Login
              </Button>
              <a target="_blank"
                 rel="noopener noreferrer"
                 className={this.props.classes.link}
                 href="https://ailytic.com/support"><Typography
                  gutterBottom
                  className={this.props.classes.forgotPasswordText}
                  color="primary">
                Forget your details?
              </Typography></a>
              <hr className={this.props.classes.hr} />
              <a target="_blank"
                 rel="noopener noreferrer"
                 className={this.props.classes.link}
                 href="https://ailytic.com/support"><Typography
                  gutterBottom
                  className={this.props.classes.helpText}>
                Need an Account?
              </Typography></a>
              <a target="_blank"
                 rel="noopener noreferrer"
                 className={this.props.classes.link}
                 href="https://ailytic.com/support"><Typography
                  gutterBottom
                  className={this.props.classes.helpText}>
                Learn More
              </Typography></a>
              <a target="_blank"
                 rel="noopener noreferrer"
                 className={this.props.classes.link}
                 href="https://ailytic.com/support"><Typography
                  gutterBottom
                  className={this.props.classes.helpText}>
                Contact Us
              </Typography></a>
            </VBox>
          </Paper>
          <ResetPasswordDialog
              loading={this.state.loading}
              handleSubmit={this.resetPassword}
              handleClose={() => this.setState({ openDialog: false })}
              open={this.state.openDialog}
          />
          <RequestPasswordDialog
              loading={this.state.loading}
              handleSubmit={this.requestPassword}
              handleClose={() => this.setState({ openRequestDialog: false })}
              open={this.state.openRequestDialog}
          />
        </VBox>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
