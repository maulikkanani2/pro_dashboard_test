import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CREATE_OPTIMISATION_PROPERTY } from '../../graphql/mutations/optimisationProperties';
import { OPTIMISATION_PROPERTIES } from '../../graphql/queries/optimisationProperties';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';

const OptimisationPropertyForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  };

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.name}
            onChange={props.onFieldChange('name', eventToValue)}
            label="Name"
          />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.create.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
};

const mapPropsToFields = props => ({
  name: '',
});

const mapPropsToVariables = props => ({
  data: {
    name: props.getFormValues().name,
    scenario: {
      connect: {
        id: props.scenario.id,
      },
    },
  },
});

const updateOptimisationProperty = (props) => {
  return (cache, { data: { createOptimisationProperty } }) => {
    let { optimisationProperties } = cache.readQuery({ query: OPTIMISATION_PROPERTIES });
    optimisationProperties = [createOptimisationProperty, ...optimisationProperties];
    cache.writeQuery({ query: OPTIMISATION_PROPERTIES, data: { optimisationProperties } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A name must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: CREATE_OPTIMISATION_PROPERTY,
  propName: 'create',
  update: updateOptimisationProperty,
  validations,
})(OptimisationPropertyForm)));
