import React from 'react';

import { FormToggle } from '../../form';
import RoutingForm from './form';
import withEditing from '../../../wrappers/edit';

const RoutingAdd = (props) => {
  if (props.isEditing) {
    return (<RoutingForm operation={props.operation} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(RoutingAdd);
