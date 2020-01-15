import React from 'react';

import { FormToggle } from '../../form';
import AvailabilityForm from './form';
import withEditing from '../../../wrappers/edit';

const AvailabilityAdd = (props) => {
  if (props.isEditing) {
    return (<AvailabilityForm person={props.person} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(AvailabilityAdd);
