import React from 'react';
import PropTypes from 'prop-types';

import {
  DELETE_EQUIPMENT_CLASS,
} from '../../../graphql/mutations/equipmentClasses';
import {EQUIPMENT_CLASSES} from '../../../graphql/queries/equipmentClasses';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const EquipmentClassDeleteMenuItem = ({closeMenu, remove, updateDialog}) => {
  const handler = () => {
    remove ().then (() => {
      updateDialog (null);
    });
  };

  return <DeleteMenuItem handler={handler} closeMenu={closeMenu} />;
};

const mapPropsToWhere = props => ({
  where: {id: props.equipmentClass.id},
});

const updateEquipmentClass = props => {
  return (cache, {data: {deleteEquipmentClass}}) => {
    let {equipmentClasses} = cache.readQuery ({query: EQUIPMENT_CLASSES});
    equipmentClasses = equipmentClasses.filter (
      equipmentClass => equipmentClass.id !== deleteEquipmentClass.id
    );
    cache.writeQuery ({query: EQUIPMENT_CLASSES, data: {equipmentClasses}});
  };
};

EquipmentClassDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  personnelClass: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario (
  withDialog ('equipment') (
    withDelete (mapPropsToWhere, {
      mutation: DELETE_EQUIPMENT_CLASS,
      update: updateEquipmentClass,
    }) (EquipmentClassDeleteMenuItem)
  )
);
