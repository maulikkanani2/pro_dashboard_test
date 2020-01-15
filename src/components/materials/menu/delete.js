import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_MATERIAL } from '../../../graphql/mutations/materials';
import { MATERIALS } from '../../../graphql/queries/materials';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const MaterialDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.material.id }
});

const updateMaterials = (props) => {
  return (cache, { data: { deleteMaterialDefinition } }) => {
    let { materialDefinitions } = cache.readQuery({ query: MATERIALS });
    materialDefinitions = materialDefinitions.filter(material => material.id !== deleteMaterialDefinition.id);
    cache.writeQuery({ query: MATERIALS, data: { materialDefinitions } });
  };
};

MaterialDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('materials')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_MATERIAL,
    update: updateMaterials,
  })(MaterialDeleteMenuItem)));
