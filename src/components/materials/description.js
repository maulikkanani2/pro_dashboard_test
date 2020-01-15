import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_MATERIAL } from '../../graphql/mutations/materials';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const MaterialDescription = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.description}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('description', eventToValue)}
  />);
}

const mapPropsToFields = props => ({
  description: props.material.description,
});

const mapPropsToVariables = props => ({
  where: { id: props.material.id },
  data: { description: props.getFormValues().description },
});

MaterialDescription.propTypes = {
  material: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

MaterialDescription.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, { 
    mutation: UPDATE_MATERIAL,
    propName: 'update',
  })(MaterialDescription)));
