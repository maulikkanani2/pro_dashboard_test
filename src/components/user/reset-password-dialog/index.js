import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';

import Box from '../../layout/Box';
import Dialog, { DialogBody, DialogColumn, DialogHeader } from '../../dialog';
import { FieldControl } from '../../field';

const initialState = { newPassword: '', confirmNewPassword: '' };

class ResetPasswordDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
    this.onCloseHandler = this.onCloseHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(props) {
    if (props.open && !this.props.open) {
      this.setState(initialState);
    }
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  handleChange(fieldName) {
    return (e) => this.setState({ [fieldName]: e.target.value });
  }

  handleSubmit() {
    if (!this.state.newPassword && !this.state.confirmNewPassword) {
      return;
    }
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      Swal({
        position: 'top',
        title: 'Error',
        text: 'Passwords must be equal',
        toast: true,
        showConfirmationButton: false,
        confirmButtonColor: '#0079FF',
        timer: 5000
      });
      return;
    }
    this.props.handleSubmit(this.state.newPassword);
  }

  render() {
    const { open, loading } = this.props;

    return (
      <Dialog isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}>
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            Reset Password
            </Box>
          <Box flex="1" justifyContent="flex-end">
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <TextField
                type="password"
                label="New Password"
                fullWidth
                InputLabelProps={{ id: 'newPasswordFieldLabel' }}
                value={this.state.newPassword}
                onChange={this.handleChange('newPassword')} />
            </FieldControl>
            <FieldControl>
              <TextField
                type="password"
                label="Confirm New Password"
                fullWidth
                InputLabelProps={{ id: 'confirmNewPasswordFieldLabel' }}
                value={this.state.confirmNewPassword}
                onChange={this.handleChange('confirmNewPassword')} />
            </FieldControl>
            <Box justifyContent="flex-end">
              <Button
                onClick={this.handleSubmit}
                variant="raised"
                color="primary">
                Change Password
                </Button>
            </Box>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

ResetPasswordDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool
};

ResetPasswordDialog.defaultProps = {
  loading: false
};

export default ResetPasswordDialog;
