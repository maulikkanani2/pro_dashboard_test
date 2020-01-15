import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_ORDER } from '../../../graphql/mutations/orders';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { eventToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { OPERATIONS } from '../../../graphql/queries/operations';

const OrderItemForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findOperation = (event) => {
    return props.operationsDefinitionClasses.data.find((operation) => operation.id === event.target.value);
  }

  if (props.operationsDefinitionClasses.loading || !props.operationsDefinitionClasses.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            type="number"
            value={props.formValues.quantity}
            onChange={props.onFieldChange('quantity', eventToValue)}
            label="Quantity" />
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select fullWidth value={props.formValues.operation.id} onChange={props.onFieldChange('operation', selectToValue(findOperation))}>
              {props.operationsDefinitionClasses.data.map((operation) => { return <MenuItem key={operation.id} value={operation.id}>{operation.externalId}</MenuItem> })}
            </Select>
          </FormControl>
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
  quantity: props.orderItem ? props.orderItem.quantity : 1,
  operation: props.orderItem ? props.orderItem.operationsDefinitionClass : { id: '', externalId: '' },
});

const mapPropsToMutationVariables = props => {
  if (props.orderItem) {
    return {
      where: { id: props.order.id },
      data: {
        orderItems: {
          update: {
            data: {
              quantity: props.getFormValues().quantity,
              operationsDefinitionClass: {
                connect: {
                  id: props.getFormValues().operation.id
                },
              },
            },
            where: { id: props.orderItem.id },
          }
        }
      }
    }
  } else {
    return {
      where: { id: props.order.id },
      data: {
        orderItems: {
          create: {
            quantity: props.getFormValues().quantity,
            operationsDefinitionClass: {
              connect: {
                id: props.getFormValues().operation.id
              },
            },
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
  function: (variables, props) => { return !!(props.getFormValues().operation.id !== '' && props.getFormValues().quantity) },
  message: 'All fields are required to be filled in!',
}, {
  function: (variables, props) => { return props.getFormValues().quantity > 0 },
  message: 'Quantity must be greater than 0!',
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_ORDER,
  propName: 'update',
  validations,
})(withQuery({
  query: OPERATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'operationsDefinitionClasses',
})(OrderItemForm))));
