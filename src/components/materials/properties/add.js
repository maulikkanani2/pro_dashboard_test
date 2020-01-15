import React from 'react';
import PropTypes from 'prop-types';

import { FormToggle } from '../../form';
import MaterialPropertyForm from './form';
import { withEditing } from '../../../wrappers';

const MaterialPropertyAdd = (props) => {
  if (props.isEditing) {
    return (<MaterialPropertyForm
      material={props.material}
      onCancel={props.toggleEditing(false)}
    />);
  }

  return <FormToggle onClick={props.toggleEditing(true)} />
}

MaterialPropertyAdd.propTypes = {
  material: PropTypes.object.isRequired
}

export default withEditing(MaterialPropertyAdd);
