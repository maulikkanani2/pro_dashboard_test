import React from 'react';

import { FormToggle } from '../../../form';
import RequiredMaterialsForm from './form';
import withEditing from '../../../../wrappers/edit';

const RequiredMaterialsAdd = (props) => {
  if (props.isEditing) {
    return (<RequiredMaterialsForm routing={props.routing} operation={props.operation} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(RequiredMaterialsAdd);
