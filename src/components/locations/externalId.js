import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_LOCATION } from '../../graphql/mutations/locations';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const LocationExternalId = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.externalId}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('externalId', eventToValue)}
  />);
}

const mapPropsToFields = props => ({
  externalId: props.location.externalId,
});

const mapPropsToVariables = props => ({
  where: { id: props.location.id },
  data: { externalId: props.getFormValues().externalId },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A location code must be filled in!'
}];

LocationExternalId.propTypes = {
  location: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

LocationExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_LOCATION,
    propName: 'update',
    validations,
  })(LocationExternalId)));
