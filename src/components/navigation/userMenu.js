import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import UserIcon from '@material-ui/icons/Person';

import Auth from '../../utils/auth';

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLogout = () => {
    const auth = new Auth();

    auth.logout()
      .then(() => {
        this.props.history.push('/login');
      });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton className={this.props.classes.button} size="small" onClick={this.handleClick}>
          <UserIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

UserMenu.defaultProps = {
  classes: {}
};

export default withRouter(UserMenu);
