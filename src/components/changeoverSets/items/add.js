import React from 'react';

import { FormToggle } from '../../form';
import ChangeoverSetItemForm from './form';
import withEditing from '../../../wrappers/edit';

const ChangeoverSetItemAdd = (props) => {
  if (props.isEditing) {
    return (<ChangeoverSetItemForm changeoverSet={props.changeoverSet} onCancel={props.toggleEditing(false)} />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

export default withEditing(ChangeoverSetItemAdd);
