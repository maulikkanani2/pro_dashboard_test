import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_SCENARIO } from '../../graphql/mutations/scenarios';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const ScenarioDescription = (props) => {
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
  description: props.scenario.description,
});

const mapPropsToVariables = props => ({
  where: { id: props.scenario.id },
  data: { description: props.getFormValues().description, updatedAt: new Date() },
});

ScenarioDescription.propTypes = {
  scenario: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ScenarioDescription.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_SCENARIO,
    propName: 'update',
  })(ScenarioDescription)));
