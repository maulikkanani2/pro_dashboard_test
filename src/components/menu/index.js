import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

class MenuWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) { this.setState({ anchorEl: event.currentTarget }); }

  handleClose() { this.setState({ anchorEl: null }); };

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { closeMenu: this.handleClose }));

    return (
      <Fragment>
        <IconButton onClick={this.handleClick}>
          {this.props.icon}
        </IconButton>
        <Menu
          onClose={this.handleClose}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}>
          { children }
        </Menu>
      </Fragment>
    );
  }
};

MenuWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node
};

MenuWrapper.defaultProps = {
  icon: <MoreVertIcon />
}

export default MenuWrapper;
