import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_OPTIMISATION_HIERARCHY } from '../../../graphql/mutations/optimisationHierarchies';
import { OPTIMISATION_HIERARCHIES } from '../../../graphql/queries/optimisationHierarchies';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const OptimisationHierarchyDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.optimisationHierarchy.id }
});

const updateOptimisationHierarchys = (props) => {
  return (cache, { data: { deleteOptimisationHierarchy } }) => {
    let { optimisationHierarchies } = cache.readQuery({ query: OPTIMISATION_HIERARCHIES });
    optimisationHierarchies = optimisationHierarchies.filter(optimisationHierarchy => optimisationHierarchy.id !== deleteOptimisationHierarchy.id);
    cache.writeQuery({ query: OPTIMISATION_HIERARCHIES, data: { optimisationHierarchies } });
  };
};

OptimisationHierarchyDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  optimisationHierarchy: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('optimisationHierarchy')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_OPTIMISATION_HIERARCHY,
    update: updateOptimisationHierarchys,
  })(OptimisationHierarchyDeleteMenuItem)));
