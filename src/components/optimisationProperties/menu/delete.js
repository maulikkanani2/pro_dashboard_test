import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_OPTIMISATION_PROPERTY } from '../../../graphql/mutations/optimisationProperties';
import { OPTIMISATION_PROPERTIES } from '../../../graphql/queries/optimisationProperties';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const OptimisationPropertyDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.optimisationProperty.id }
});

const updateOptimisationPropertys = (props) => {
  return (cache, { data: { deleteOptimisationProperty } }) => {
    let { optimisationProperties } = cache.readQuery({ query: OPTIMISATION_PROPERTIES });
    optimisationProperties = optimisationProperties.filter(optimisationProperty => optimisationProperty.id !== deleteOptimisationProperty.id);
    cache.writeQuery({ query: OPTIMISATION_PROPERTIES, data: { optimisationProperties } });
  };
};

OptimisationPropertyDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  optimisationProperty: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('optimisationProperty')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_OPTIMISATION_PROPERTY,
    update: updateOptimisationPropertys,
  })(OptimisationPropertyDeleteMenuItem)));
