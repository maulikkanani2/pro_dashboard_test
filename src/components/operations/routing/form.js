import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { UPDATE_OPERATION } from '../../../graphql/mutations/operations';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withScenario from '../../../wrappers/scenario';
import { eventToValue } from '../../../utils/fieldValueMapping';

const RoutingForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Routing Code" />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.create.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

const mapPropsToFields = props => ({
  externalId: '',
});

const mapPropsToMutationVariables = props => ({
  data: {
    operationsDefinitions: {
      create: {
        externalId: props.getFormValues().externalId,
        operationsSegments: {
          create: {
            externalId: props.getFormValues().externalId,
            calendarisedThroughputSet: {
              create: {
                name: props.getFormValues().externalId,
                scenario: {
                  connect: {
                    id: props.scenario.id,
                  }
                }
              }
            }
          },
        }
      }
    }
  },
  where: { id: props.operation.id }
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A routing code must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'create',
  validations,
})(RoutingForm)));
