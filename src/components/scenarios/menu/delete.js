import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_SCENARIO } from '../../../graphql/mutations/scenarios';
import { SCENARIOS } from '../../../graphql/queries/scenarios';
import withDelete from '../../../wrappers/delete';
import withDialog from '../../../wrappers/dialog';
import DeleteMenuItem from '../../menu/delete';

const ScenarioDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
  const handler = () => {
    remove.execute().then(() => {
      updateDialog(null);
    });
  }

  return (
    <DeleteMenuItem
      handler={handler}
      closeMenu={closeMenu} />
  );
};

const mapPropsToWhere = props => ({
  where: { id: props.scenario.id }
});

const updateScenarios = (props) => {
  return (cache, { data: { deleteScenario } }) => {
    let { scenarios } = cache.readQuery({ query: SCENARIOS });
    scenarios = scenarios.filter(scenario => scenario.id !== deleteScenario.id);
    cache.writeQuery({ query: SCENARIOS, data: { scenarios } });
  }
}

ScenarioDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  scenario: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withDialog('scenarios')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_SCENARIO,
    update: updateScenarios,
  })(ScenarioDeleteMenuItem));
