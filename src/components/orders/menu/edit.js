import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/ModeEdit';

import withDialog from '../../../wrappers/dialog';

const OrderEditMenuItem = ({ closeMenu, order, updateDialog }) => {
  const handler = () => {
    updateDialog(order);
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

export default withDialog('orders')(OrderEditMenuItem);
