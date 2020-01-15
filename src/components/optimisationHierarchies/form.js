import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CREATE_OPTIMISATION_HIERARCHY } from '../../graphql/mutations/optimisationHierarchies';
import { OPTIMISATION_HIERARCHIES } from '../../graphql/queries/optimisationHierarchies';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';

const OptimisationHierarchyForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  };

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Code"
          />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.description}
            onChange={props.onFieldChange('description', eventToValue)}
            label="Description"
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
  description: '',
  externalId: '',
});

const mapPropsToVariables = props => ({
  data: {
    description: props.getFormValues().description,
    externalId: props.getFormValues().externalId,
    scenario: {
      connect: {
        id: props.scenario.id,
      },
    },
  },
});

const updateOptimisationHierarchy = (props) => {
  return (cache, { data: { createOptimisationHierarchy } }) => {
    let { optimisationHierarchies } = cache.readQuery({ query: OPTIMISATION_HIERARCHIES });
    optimisationHierarchies = [createOptimisationHierarchy, ...optimisationHierarchies];
    cache.writeQuery({ query: OPTIMISATION_HIERARCHIES, data: { optimisationHierarchies } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A code must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: CREATE_OPTIMISATION_HIERARCHY,
  propName: 'create',
  update: updateOptimisationHierarchy,
  validations,
})(OptimisationHierarchyForm)));
