import React from 'react';

import { FormToggle } from '../../form';
import OptimisationPropertyValueForm from './form';
import withEditing from '../../../wrappers/edit';

const OptimisationPropertyValueAdd = (props) => {
  if (props.isEditing) {
    return (<OptimisationPropertyValueForm value={props.value} optimisationProperty={props.optimisationProperty} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(OptimisationPropertyValueAdd);
