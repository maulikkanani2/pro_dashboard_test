import React from 'react';

import { FormToggle } from '../../../form';
import RequiredPersonnelForm from './form';
import withEditing from '../../../../wrappers/edit';

const RequiredPersonnelAdd = (props) => {
  if (props.isEditing) {
    return (<RequiredPersonnelForm routing={props.routing} operation={props.operation} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(RequiredPersonnelAdd);
