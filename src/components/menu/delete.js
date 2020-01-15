
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteMenuItem = ({ closeMenu, handler }) => {
  const func = () => {
    closeMenu();
    handler();
  };

  return (
    <MenuItem onClick={func}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText inset primary="Delete" />
    </MenuItem>
  );
};

DeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  handler: PropTypes.func.isRequired,
};

export default DeleteMenuItem;
