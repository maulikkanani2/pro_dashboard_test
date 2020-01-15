import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_CHANGEOVER_SET } from '../../graphql/mutations/changeoverSets';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withEditing from '../../wrappers/edit';

const ChangeoverSetDefaultTime = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.defaultTime}
    variant={props.variant}
    onSave={onSave}
    type="number"
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('defaultTime', eventToValue)}
  />);
};

const mapPropsToFields = props => ({
  defaultTime: props.changeoverSet.defaultTime,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.changeoverSet.id },
  data: { defaultTime: props.getFormValues().defaultTime },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().defaultTime) },
  message: 'A default time must be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().defaultTime > 0 },
  message: 'Default time must be greater than 0!'
}];

ChangeoverSetDefaultTime.propTypes = {
  changeoverSet: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ChangeoverSetDefaultTime.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_CHANGEOVER_SET,
  propName: 'update',
  validations,
})(ChangeoverSetDefaultTime))));