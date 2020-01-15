import React from 'react';

import { FormToggle } from '../../form';
import OrderItemForm from './form';
import withEditing from '../../../wrappers/edit';

const OrderItemAdd = (props) => {
  if (props.isEditing) {
    return (<OrderItemForm order={props.order} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(OrderItemAdd);
