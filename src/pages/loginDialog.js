import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import Typography from '@material-ui/core/Typography';

import Box from '../components/layout/Box';
import VBox from '../components/layout/VBox';
import Dialog, { DialogHeader, DialogBody } from '../components/dialog';
import Auth from '../utils/auth';

const styles = theme => ({
    root: {
        width: 500,
        maxWidth: 600,
    },
    loginButton: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 3,
    },
})

class LoginDialog extends Component {
    constructor(props) {
        super(props);

        this.onCloseHandler = this.onCloseHandler.bind(this);
        this.state = { username: localStorage.getItem('Username'), password: '', err: null, open: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    onCloseHandler() {
        return false
    }

    handleChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }

    handleLogin = () => {
        const { username, password } = this.state;
        const auth = new Auth();
        auth.login(username, password)
            .then(() => {
                this.setState({ open: false })
            })
            .catch((err) => {
                Swal({
                    position: 'top',
                    title: 'Error',
                    text: err.message,
                    toast: true,
                    showConfirmationButton: false,
                    confirmButtonColor: '#0079FF',
                    timer: 5000,
                });
            });
    }
    componentDidMount() {
        this.setState({ open: this.props.reauth || false })
    }
    componentWillReceiveProps(newProps) {
        if (typeof newProps.reauth !== 'undefined')
            this.setState({ open: newProps.reauth })
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.onCloseHandler}
                classes={{ root: this.props.classes.root }}
            >
                <DialogHeader>
                    <Box flex="1" alignItems="center">
                        <VBox flex="1" justifyContent="space-between">
                            <Typography>
                                Your session is expired. Please authnticate again.
                            </Typography>
                        </VBox>
                    </Box>
                </DialogHeader>
                <DialogBody>
                    <VBox flex="1">
                        <TextField
                            className={'username'}
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
                    </VBox>
                </DialogBody>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({ reauth: state.dialog.tokenrefresh })
LoginDialog = connect(mapStateToProps)(LoginDialog)
export default withStyles(styles)(LoginDialog);