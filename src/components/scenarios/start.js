import React from 'react';
import PropTypes from 'prop-types';

import EditableDate from '../fields/editableDate';
import { UPDATE_SCENARIO } from '../../graphql/mutations/scenarios';
import withForm from '../../wrappers/form';
import { dateToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';
import { DATE_FORMAT } from '../../constants';

const ScenarioStartDate = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableDate
    editing={props.isEditing}
    onClick={props.toggleEditing(true)}
    format={DATE_FORMAT}
    date={props.formValues.startDate}
    variant={props.variant}
    onChange={props.onFieldChange('startDate', dateToValue, onSave)}
  />);
}

const mapPropsToFields = props => ({
  startDate: props.scenario.startDate,
});

const mapPropsToVariables = props => ({
  where: { id: props.scenario.id },
  data: { startDate: props.getFormValues().startDate, updatedAt: new Date() },
});

ScenarioStartDate.propTypes = {
  scenario: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ScenarioStartDate.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_SCENARIO,
    propName: 'update',
  })(ScenarioStartDate)));
