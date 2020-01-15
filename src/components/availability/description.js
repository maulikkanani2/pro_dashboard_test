import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_AVAILABILITY_TEMPLATE } from '../../graphql/mutations/availabilityTemplates';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const AvailabilityDescription = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.description}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('description', eventToValue)}
    isResize={true}
  />);
};

const mapPropsToFields = props => ({
  description: props.availability.description,
});

const mapPropsToVariables = props => ({
  where: { id: props.availability.id },
  data: { description: props.getFormValues().description },
});

AvailabilityDescription.propTypes = {
  availability: PropTypes.object.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

AvailabilityDescription.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: UPDATE_AVAILABILITY_TEMPLATE,
  propName: 'update',
})(AvailabilityDescription)));
