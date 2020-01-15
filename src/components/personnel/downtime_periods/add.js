import React from 'react';

import { FormToggle } from '../../form';
import DowntimePeriodForm from './form';
import withEditing from '../../../wrappers/edit';

const DowntimePeriodAdd = (props) => {
  if (props.isEditing) {
    return (<DowntimePeriodForm person={props.person} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(DowntimePeriodAdd);
