import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import Form, { FormBody, FormButtons, FormField } from '../../../form';
import withScenario from '../../../../wrappers/scenario';
import withMutation from '../../../../wrappers/mutation';
import withForm from '../../../../wrappers/form';
import { dateToValue, eventToValue } from '../../../../utils/fieldValueMapping';
import { DATE_FORMAT } from '../../../../constants';

const RoutingThroughputForm = (props) => {
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
        <FormField>
          <TextField
            fullWidth
            label="Rate"
            type="number"
            value={props.formValues.quantity}
            onChange={props.onFieldChange('quantity', eventToValue)} />
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
  startTime: props.throughput ? props.throughput.startTime : new Date(),
  endTime: props.throughput ? props.throughput.endTime : new Date(),
  quantity: props.throughput ? props.throughput.quantity : 1,
});

const mapPropsToMutationVariables = props => {
  if (props.throughput) {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    calendarisedThroughputSet: {
                      update: {
                        calendarisedThroughputSetItems: {
                          update: {
                            data: {
                              startTime: props.getFormValues().startTime,
                              endTime: props.getFormValues().endTime,
                              quantity: props.getFormValues().quantity,
                            },
                            where: { id: props.throughput.id },
                          },
                        },
                      },
                    },
                  },
                  where: { id: props.routing.operationsSegments[0].id },
                },
              },
            },
            where: { id: props.routing.id },
          },
        },
      },
    };
  } else {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    calendarisedThroughputSet: {
                      update: {
                        calendarisedThroughputSetItems: {
                          create: {
                            startTime: props.getFormValues().startTime,
                            endTime: props.getFormValues().endTime,
                            quantity: props.getFormValues().quantity,
                          },
                        },
                      },
                    },
                  },
                  where: { id: props.routing.operationsSegments[0].id },
                },
              },
            },
            where: { id: props.routing.id },
          },
        },
      },
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().startTime && props.getFormValues().endTime) },
  message: 'A start time and end time must be filled in!'
}, {
  function: (variables, props) => { return new Date(props.getFormValues().startTime) < new Date(props.getFormValues().endTime) },
  message: 'End time must be after the start time!',
}, {
  function: (variables, props) => { return props.getFormValues().quantity > 0 },
  message: 'Rate must be greater than 0!',
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
  validations,
})(RoutingThroughputForm)));
