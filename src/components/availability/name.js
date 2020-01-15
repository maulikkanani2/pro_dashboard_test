import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_AVAILABILITY_TEMPLATE } from '../../graphql/mutations/availabilityTemplates';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const AvailabilityName = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.name}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('name', eventToValue)}
  />);
}

const mapPropsToFields = props => ({
  name: props.availability.name,
});

const mapPropsToVariables = props => ({
  where: { id: props.availability.id },
  data: { name: props.getFormValues().name },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A name must be filled in!'
}];

AvailabilityName.propTypes = {
  availability: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

AvailabilityName.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_AVAILABILITY_TEMPLATE,
    propName: 'update',
    validations,
  })(AvailabilityName)));
