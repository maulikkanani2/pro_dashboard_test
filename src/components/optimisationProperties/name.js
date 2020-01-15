import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_OPTIMISATION_PROPERTY } from '../../graphql/mutations/optimisationProperties';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const OptimisationPropertyName = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.name}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('name', eventToValue)}
  />);
};

const mapPropsToFields = props => ({
  name: props.optimisationProperty.name,
});

const mapPropsToVariables = props => ({
  where: { id: props.optimisationProperty.id },
  data: { name: props.getFormValues().name },
});

OptimisationPropertyName.propTypes = {
  optimisationProperty: PropTypes.object.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OptimisationPropertyName.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: UPDATE_OPTIMISATION_PROPERTY,
  propName: 'update',
})(OptimisationPropertyName)));
