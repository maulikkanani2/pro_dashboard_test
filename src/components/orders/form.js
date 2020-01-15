import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';

import { CREATE_ORDER } from '../../graphql/mutations/orders';
import { ORDERS } from '../../graphql/queries/orders';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import { eventToValue, dateToValue } from '../../utils/fieldValueMapping';

const OrderForm = (props) => {
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
            label="Order Code" />
        </FormField>
        <FormField>
          <DatePicker
            fullWidth
            label="Due Date"
            value={props.formValues.date}
            onChange={props.onFieldChange('date', dateToValue)} />
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
  date: new Date(),
  externalId: '',
});

const mapPropsToMutationVariables = props => ({
  data: {
    externalId: props.getFormValues().externalId,
    date: props.getFormValues().date,
    earliestStartDate: new Date(),
    scenario: {
      connect: {
        id: props.scenario.id
      }
    }
  },
});

const updateOrders = (props) => {
  return (cache, { data: { createOrder } }) => {
    let { orders } = cache.readQuery({ query: ORDERS });
    orders = [createOrder, ...orders];
    cache.writeQuery({ query: ORDERS, data: { orders } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId && props.getFormValues().date) },
  message: 'All fields are required to be filled in!',
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_ORDER,
  propName: 'create',
  update: updateOrders,
  validations,
})(OrderForm)));
