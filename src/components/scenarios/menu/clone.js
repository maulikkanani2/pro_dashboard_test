import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloneIcon from '@material-ui/icons/ContentCopy';
import { withApollo } from 'react-apollo';

import swal from 'sweetalert2';
import { SCENARIO, SCENARIOS } from '../../../graphql/queries/scenarios';

const ScenarioCloneMenuItem = ({ closeMenu, scenario, client }) => {
  const handler = () => {
    closeMenu();
    const token = localStorage.getItem('ApiToken');

    swal({
      title: `Clone ${scenario.name}`,
      input: 'text',
      inputPlaceholder: 'Scenario Name',
      showCancelButton: true,
      confirmButtonText: 'Clone',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#0079FF',
      allowOutsideClick: () => !swal.isLoading(),
      preConfirm: (scenarioName) => {
        return fetch(`${window.config.graphqlEndpoint}/clone`, {
          body: JSON.stringify({ id: scenario.id, name: scenarioName }),
          method: 'POST',
          mode: 'cors',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json',
          }
        }).then(response => response.json())
          .then((response) => {
            client.query({
              query: SCENARIO,
              variables: { where: { id: response.id } }
            }).then((data) => {
              let { scenarios } = client.cache.readQuery({ query: SCENARIOS });
              scenarios = [...scenarios, data.data.scenario];
              client.cache.writeQuery({ query: SCENARIOS, data: { scenarios } });
            });
          })
      }
    })
  }

  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>
        <CloneIcon />
      </ListItemIcon>
      <ListItemText inset primary="Clone" />
    </MenuItem>
  );
}

export default withApollo(ScenarioCloneMenuItem);
