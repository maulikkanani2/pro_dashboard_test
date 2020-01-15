import React from 'react';

import { FormToggle } from '../../../form';
import RoutingThroughputForm from './form';
import withEditing from '../../../../wrappers/edit';

const RoutingThroughputAdd = (props) => {
  if (props.isEditing) {
    return (<RoutingThroughputForm routing={props.routing} operation={props.operation} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(RoutingThroughputAdd);
