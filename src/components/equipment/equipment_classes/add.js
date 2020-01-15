import React from 'react';

import { FormToggle } from '../../form';
import EquipmentClassForm from './form';
import withEditing from '../../../wrappers/edit';

const EquipmentClassAdd = (props) => {
  if (props.isEditing) {
    return (<EquipmentClassForm equipment={props.equipment} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(EquipmentClassAdd);
