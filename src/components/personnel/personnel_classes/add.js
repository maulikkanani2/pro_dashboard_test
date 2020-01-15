import React from 'react';

import { FormToggle } from '../../form';
import PersonnelClassForm from './form';
import withEditing from '../../../wrappers/edit';

const PersonnelClassAdd = (props) => {
  if (props.isEditing) {
    return (<PersonnelClassForm person={props.person} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(PersonnelClassAdd);
