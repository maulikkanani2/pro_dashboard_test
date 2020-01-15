import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CREATE_CHANGEOVER_SET } from '../../graphql/mutations/changeoverSets';
import { CHANGEOVER_SETS } from '../../graphql/queries/changeoverSets';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';

const ChangeoverSetForm = (props) => {
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
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.description}
            onChange={props.onFieldChange('description', eventToValue)}
            label="Description"
          />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            type="number"
            value={props.formValues.defaultTime}
            onChange={props.onFieldChange('defaultTime', eventToValue)}
            label="Default Time"
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
  defaultTime: 0,
});

const mapPropsToVariables = props => ({
  data: {
    description: props.getFormValues().description,
    name: props.getFormValues().name,
    defaultTime: props.getFormValues().defaultTime,
    scenario: {
      connect: {
        id: props.scenario.id,
      },
    },
  },
});

const updateChangeoverSet = (props) => {
  return (cache, { data: { createChangeoverSet } }) => {
    let { changeoverSets } = cache.readQuery({ query: CHANGEOVER_SETS });
    changeoverSets = [createChangeoverSet, ...changeoverSets];
    cache.writeQuery({ query: CHANGEOVER_SETS, data: { changeoverSets } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) && !!(props.getFormValues().defaultTime) },
  message: 'A name and default time must be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().defaultTime > 0 },
  message: 'Default time must be greater than 0!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: CREATE_CHANGEOVER_SET,
  propName: 'create',
  update: updateChangeoverSet,
  validations,
})(ChangeoverSetForm)));
