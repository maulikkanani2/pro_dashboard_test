import React from 'react';

import { FormToggle } from '../../form';
import PersonnelPositionForm from './form';
import withEditing from '../../../wrappers/edit';

const PersonnelPositionAdd = (props) => {
  if (props.isEditing) {
    return (<PersonnelPositionForm person={props.person} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(PersonnelPositionAdd);
