import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_LOCATION } from '../../../graphql/mutations/locations';
import { LOCATIONS } from '../../../graphql/queries/locations';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';

const LocationDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
  const handler = () => { remove.execute(); }

  return (
    <DeleteMenuItem
      handler={handler}
      closeMenu={closeMenu} />
  );
};

const mapPropsToWhere = props => ({
  where: { id: props.location.id }
});

const updateLocations = (props) => {
  return (cache, { data: { deleteHierarchyScope } }) => {
    let { hierarchyScopes } = cache.readQuery({ query: LOCATIONS });
    hierarchyScopes = hierarchyScopes.filter(location => location.id !== deleteHierarchyScope.id);
    cache.writeQuery({ query: LOCATIONS, data: { hierarchyScopes } });
  };
};

LocationDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_LOCATION,
    update: updateLocations,
  })(LocationDeleteMenuItem));
