import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_EQUIPMENT } from '../../../graphql/mutations/equipment';
import { EQUIPMENTS } from '../../../graphql/queries/equipment';
import { EQUIPMENT_CLASSES } from '../../../graphql/queries/equipmentClasses';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

let EquipmentDeleteMenuItem = ({
  closeMenu,
  remove,
  updateDialog,
}) => {
  const handler = () => {
    remove.execute().then(() => {
      updateDialog(null);
    });
  };

  return <DeleteMenuItem handler={handler} closeMenu={closeMenu} />;
};

const mapPropsToWhere = props => ({
  where: { id: props.equipment.id },
});

const updateEquipments = props => {
  return (cache, { data: { deleteEquipment } }) => {
    let { equipments } = cache.readQuery({ query: EQUIPMENTS });
    equipments = equipments.filter(equipment => equipment.id !== deleteEquipment.id);
    cache.writeQuery({ query: EQUIPMENTS, data: { equipments } });

    try {
      let { equipmentClasses } = cache.readQuery({ query: EQUIPMENT_CLASSES });
      equipmentClasses = equipmentClasses.filter(equipmentClass => equipmentClass.externalId !== props.equipment.externalId);
      cache.writeQuery({ query: EQUIPMENT_CLASSES, data: { equipmentClasses } });
    } catch (e) { }
  };
};

EquipmentDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  equipment: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(
  withDialog('equipments')(
    withDelete(mapPropsToWhere, {
      mutation: DELETE_EQUIPMENT,
      update: updateEquipments,
    })(EquipmentDeleteMenuItem)
  )
);
