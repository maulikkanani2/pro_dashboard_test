import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/ModeEdit';

import withDialog from '../../../wrappers/dialog';

const ScenarioEditMenuItem = ({ closeMenu, scenario, updateDialog }) => {
  const handler = () => {
    updateDialog(scenario);
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

export default withDialog('scenarios')(ScenarioEditMenuItem);