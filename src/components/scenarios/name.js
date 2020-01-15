import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_SCENARIO } from '../../graphql/mutations/scenarios';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const ScenarioName = (props) => {
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
  name: props.scenario.name,
});

const mapPropsToVariables = props => ({
  where: { id: props.scenario.id },
  data: { name: props.getFormValues().name, updatedAt: new Date() },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A scenario name is must be filled in!'
}];

ScenarioName.propTypes = {
  scenario: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ScenarioName.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_SCENARIO,
    propName: 'update',
    validations,
  })(ScenarioName)));
