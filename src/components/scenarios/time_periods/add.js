import React from 'react';

import { FormToggle } from '../../form';
import TimePeriodForm from './form';
import withEditing from '../../../wrappers/edit';

const TimePeriodAdd = (props) => {
  if (props.isEditing) {
    return (<TimePeriodForm scenario={props.scenario} onCancel={props.toggleEditing(false)} />);
  }
  
  return <FormToggle onClick={props.toggleEditing(true)}/>
}

export default withEditing(TimePeriodAdd);
