
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/ModeEdit';

const EditMenuItem = ({ closeMenu, showDialog }) => {
  const handler = () => {
    showDialog();
    closeMenu();
  };

  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </MenuItem>
  );
};

EditMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default EditMenuItem;
