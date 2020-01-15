import React from 'react';
import Button from '@material-ui/core/Button';
import { DateTimePicker } from 'material-ui-pickers';

import { UPDATE_EQUIPMENT } from '../../../graphql/mutations/equipment';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { dateToValue } from '../../../utils/fieldValueMapping';
import { DATE_TIME_FORMAT } from '../../../constants';

const DowntimePeriodForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <DateTimePicker
            fullWidth
            label="Start Date"
            format={DATE_TIME_FORMAT}
            value={props.formValues.startTime}
            onChange={props.onFieldChange('startTime', dateToValue)} />
        </FormField>
        <FormField>
          <DateTimePicker
            fullWidth
            label="End Date"
            format={DATE_TIME_FORMAT}
            value={props.formValues.endTime}
            onChange={props.onFieldChange('endTime', dateToValue)} />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.update.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

const mapPropsToFields = props => ({
  startTime: props.downtimePeriod ? props.downtimePeriod.startTime : new Date(),
  endTime: props.downtimePeriod ? props.downtimePeriod.endTime : new Date(),
});

const mapPropsToMutationVariables = props => {
  if (props.downtimePeriod) {
    return {
      where: { id: props.equipment.id },
      data: {
        downtimePeriods: {
          update: {
            data: {
              startTime: props.getFormValues().startTime,
              endTime: props.getFormValues().endTime,
            },
            where: { id: props.downtimePeriod.id },
          }
        }
      },
    }
  } else {
    return {
      where: { id: props.equipment.id },
      data: {
        downtimePeriods: {
          create: {
            startTime: props.getFormValues().startTime,
            endTime: props.getFormValues().endTime,
          }
        },
      }
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().startTime && props.getFormValues().endTime) },
  message: 'All fields are required to be filled!'
}, {
  function: (variables, props) => { return new Date(props.getFormValues().startTime) < new Date(props.getFormValues().endTime) },
  message: 'End time must be after the start time!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_EQUIPMENT,
  propName: 'update',
  validations,
})(DowntimePeriodForm)));
