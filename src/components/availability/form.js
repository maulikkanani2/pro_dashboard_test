import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CREATE_AVAILABILITY_TEMPLATE } from '../../graphql/mutations/availabilityTemplates';
import { AVAILABILITY_TEMPLATES } from '../../graphql/queries/availabilityTemplates';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';

const AvailabilityForm = (props) => {
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
            label="Availability Name"
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
  name: '',
});

const mapPropsToVariables = props => ({
  data: {
    description: props.getFormValues().description,
    name: props.getFormValues().name.trim(),
    scenario: {
      connect: {
        id: props.scenario.id,
      },
    },
  },
});

const updateAvailability = (props) => {
  return (cache, { data: { createAvailabilityTemplate } }) => {
    let { availabilityTemplates } = cache.readQuery({ query: AVAILABILITY_TEMPLATES });
    availabilityTemplates = [createAvailabilityTemplate, ...availabilityTemplates];
    cache.writeQuery({ query: AVAILABILITY_TEMPLATES, data: { availabilityTemplates } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A name must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: CREATE_AVAILABILITY_TEMPLATE,
  propName: 'create',
  update: updateAvailability,
  validations,
})(AvailabilityForm)));
