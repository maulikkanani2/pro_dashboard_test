import React from 'react';
import PropTypes from 'prop-types';

import { FormToggle } from '../../../form';
import RequiredEquipmentForm from './form';
import withEditing from '../../../../wrappers/edit';

const RequiredEquipmentAdd = (props) => {
  if (props.isEditing) {
    return (<RequiredEquipmentForm
      routing={props.routing}
      operation={props.operation}
      onCancel={props.toggleEditing(false)}
      excludedEquipments={props.excludedEquipments}
    />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

RequiredEquipmentAdd.propTypes = {
  routing: PropTypes.object.isRequired,
  operation: PropTypes.object.isRequired,
}

export default withEditing(RequiredEquipmentAdd);
