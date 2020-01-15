import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from 'material-ui-pickers';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { dateToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { AVAILABILITY_TEMPLATES } from '../../../graphql/queries/availabilityTemplates';
import { DATE_FORMAT } from '../../../constants';

const AvailabilityForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findAvailability = (event) => {
    return props.availabilityTemplates.data.find((availability) => availability.id === event.target.value);
  }

  if (props.availabilityTemplates.loading || !props.availabilityTemplates.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select fullWidth value={props.formValues.availabilityTemplate.id} onChange={props.onFieldChange('availabilityTemplate', selectToValue(findAvailability))}>
              {props.availabilityTemplates.data.map((template) => { return <MenuItem key={template.id} value={template.id}>{template.name}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
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
  availabilityTemplate: props.availability ? props.availability.availabilityTemplate : { id: '', name: '' },
  startTime: props.availability ? props.availability.startTime : new Date(),
  endTime: props.availability ? props.availability.endTime : new Date(),
});

const mapPropsToMutationVariables = props => {
  if (props.availability) {
    return {
      where: { id: props.person.id },
      data: {
        calendarisedAvailabilityTemplateSet: {
          update: {
            calendarisedAvailabilityTemplateSetItems: {
              update: {
                data: {
                  availabilityTemplate: {
                    connect: {
                      id: props.getFormValues().availabilityTemplate.id,
                    }
                  },
                  startTime: props.getFormValues().startTime,
                  endTime: props.getFormValues().endTime,
                },
                where: { id: props.availability.id }
              }
            }
          }
        }
      }
    }
  } else {
    return {
      where: { id: props.person.id },
      data: {
        calendarisedAvailabilityTemplateSet: {
          update: {
            calendarisedAvailabilityTemplateSetItems: {
              create: {
                availabilityTemplate: {
                  connect: {
                    id: props.getFormValues().availabilityTemplate.id,
                  }
                },
                startTime: props.getFormValues().startTime,
                endTime: props.getFormValues().endTime,
              },
            }
          }
        }
      }
    }
  }
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().availabilityTemplate.id !== '' && props.getFormValues().startTime && props.getFormValues().endTime) },
  message: 'All fields are required to be filled!'
}, {
  function: (variables, props) => { return new Date(props.getFormValues().startTime) < new Date(props.getFormValues().endTime) },
  message: 'End time must be after the start time!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_PERSON,
  propName: 'update',
  validations,
})(withQuery({
  query: AVAILABILITY_TEMPLATES,
  mapToFilter: mapToQueryFilter,
  propName: 'availabilityTemplates',
})(AvailabilityForm))));
