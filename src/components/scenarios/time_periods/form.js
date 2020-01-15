import React from 'react';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';

import { UPDATE_SCENARIO } from '../../../graphql/mutations/scenarios';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { dateToValue } from '../../../utils/fieldValueMapping';
import { DATE_FORMAT } from '../../../constants';

const TimePeriodForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <DatePicker
            fullWidth
            label="Start Date"
            format={DATE_FORMAT}
            value={props.formValues.startTime}
            onChange={props.onFieldChange('startTime', dateToValue)} />
        </FormField>
        <FormField>
          <DatePicker
            fullWidth
            label="End Date"
            format={DATE_FORMAT}
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
  startTime: props.timePeriod ? props.timePeriod.startTime : new Date(),
  endTime: props.timePeriod ? props.timePeriod.endTime : new Date(),
});

const mapPropsToMutationVariables = props => {
  if (props.timePeriod) {
    return {
      where: { id: props.scenario.id },
      data: {
        updatedAt: new Date(),
        timePeriods: {
          update: {
            data: {
              startTime: props.getFormValues().startTime,
              endTime: props.getFormValues().endTime,

            },
            where: { id: props.timePeriod.id }
          }
        }
      }
    }
  } else {
    return {
      where: { id: props.scenario.id },
      data: {
        updatedAt: new Date(),
        timePeriods: {
          create: {
            startTime: props.getFormValues().startTime,
            endTime: props.getFormValues().endTime,
          }
        }
      }
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().startTime && props.getFormValues().endTime) },
  message: 'All fields are required to be filled!'
}, {
  function: (variables, props) => { return props.getFormValues().startTime < props.getFormValues().endTime },
  message: 'End time must be after the start time!'
}];

export default withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_SCENARIO,
  propName: 'update',
  validations,
})(TimePeriodForm));
