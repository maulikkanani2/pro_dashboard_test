import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/NotInterested';

import withDialog from '../../../wrappers/dialog';

const UserViewMenuItem = ({ closeMenu, user, updateDialog,...rest }) => {
  const handler = () => {
    rest.disable({username: user.Username}).then( rest.refresh() );
    closeMenu();
  };

  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText inset primary="Disable" />
    </MenuItem>
  );
};

export default withDialog('user')(UserViewMenuItem);
