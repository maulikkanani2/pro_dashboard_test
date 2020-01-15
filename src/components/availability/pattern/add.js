import React from 'react';

import { FormToggle } from '../../form';
import AvailabilityItemForm from './form';
import withEditing from '../../../wrappers/edit';

const AvailabilityItemAdd = (props) => {
  if (props.isEditing) {
    return (<AvailabilityItemForm availability={props.availability} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(AvailabilityItemAdd);
