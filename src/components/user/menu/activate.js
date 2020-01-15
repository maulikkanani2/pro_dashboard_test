import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/CheckCircle';

import withDialog from '../../../wrappers/dialog';

const UserActivateMenuItem = ({closeMenu, user, updateDialog, ...rest}) => {
  const handler = () => {
    rest.activate ({username: user.Username}).then (data => {
      rest.refresh ();
    });
    closeMenu ();
  };

  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText inset primary="Activate" />
    </MenuItem>
  );
};

export default withDialog ('user') (UserActivateMenuItem);
