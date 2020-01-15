import React from 'react';

import { FormToggle } from '../../form';
import OptimisationHierarchyPriorityForm from './form';
import withEditing from '../../../wrappers/edit';

const OptimisationHierarchyPriorityAdd = (props) => {
  if (props.isEditing) {
    return (<OptimisationHierarchyPriorityForm priority={props.priority} optimisationHierarchy={props.optimisationHierarchy} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(OptimisationHierarchyPriorityAdd);
