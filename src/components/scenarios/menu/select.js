import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DoneIcon from '@material-ui/icons/Done';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import { changeScenario } from '../../../actions/scenarioActions';

const ScenarioSelectMenuItem = ({ closeMenu, select, scenario, history, client }) => {
  const handler = () => {
    client.resetStore();
    select(scenario);
    history.push(`/scenarios/${scenario.id}`);
    closeMenu();
  }

  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>
        <DoneIcon />
      </ListItemIcon>
      <ListItemText inset primary="Select" />
    </MenuItem>
  );
}

const mapDispatchToProps = dispatch => ({
  select: (scenario) => { dispatch(changeScenario(scenario)); }
});

export default withRouter(withApollo(connect(null, mapDispatchToProps)(ScenarioSelectMenuItem)));
