import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CREATE_SCENARIO } from '../../../graphql/mutations/scenarios';
import { SCENARIOS } from '../../../graphql/queries/scenarios';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { eventToValue } from '../../../utils/fieldValueMapping';

const ScenarioForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { onCancel(); });
  }

  const onCancel = () => {
    props.onCancel();
    props.resetForm();
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.name}
            onChange={props.onFieldChange('name', eventToValue)}
            label="Scenario Name" />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={onCancel}>Cancel</Button>
        <Button disabled={props.create.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

const mapPropsToFields = props => ({
  name: '',
});

const mapPropsToMutationVariables = props => ({
  data: {
    name: props.getFormValues().name,
    status: 'Draft',
    startDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
});

const updateScenarios = (props) => {
  return (cache, { data: { createScenario } }) => {
    let { scenarios } = cache.readQuery({ query: SCENARIOS, variables: { where: {} } });
    scenarios = [...scenarios, createScenario];
    cache.writeQuery({ query: SCENARIOS, data: { scenarios }, variables: { where: {} } });
  }
}

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A scenario name is must be filled in!'
}];

export default withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_SCENARIO,
  propName: 'create',
  update: updateScenarios,
  validations,
})(ScenarioForm));
