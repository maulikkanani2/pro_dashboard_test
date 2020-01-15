import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_OPERATION } from '../../graphql/mutations/operations';
import { OPERATIONS } from '../../graphql/queries/operations';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { LOCATIONS } from '../../graphql/queries/locations';
import { OPERATIONS_TYPES } from '../../constants';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';

const OperationForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  }

  const findLocation = (event) => {
    return props.hierarchyScopes.data.find((location) => location.id === event.target.value);
  }

  const findType = (event) => {
    return OPERATIONS_TYPES.find((type) => type.id === event.target.value);
  }

  if (props.hierarchyScopes.loading || !props.hierarchyScopes.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Operation Code" />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.description}
            onChange={props.onFieldChange('description', eventToValue)}
            label="Description" />
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select fullWidth value={props.formValues.location.id} onChange={props.onFieldChange('location', selectToValue(findLocation))}>
              {props.hierarchyScopes.data.map((location) => { return <MenuItem key={location.id} value={location.id}>{location.externalId}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Operations Type</InputLabel>
            <Select fullWidth value={props.formValues.type.id} onChange={props.onFieldChange('type', selectToValue(findType))}>
              {OPERATIONS_TYPES.map((type) => { return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem> })}
            </Select>
          </FormControl>
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
  description: '',
  externalId: '',
  location: { id: '', externalId: '' },
  type: { id: '', name: '' },
});

const mapPropsToMutationVariables = props => {
  const location = props.getFormValues().location.id ? { connect: { id: props.getFormValues().location.id } } : null;

  return {
    data: {
      externalId: props.getFormValues().externalId,
      description: props.getFormValues().description,
      hierarchyScope: location,
      operationsType: props.getFormValues().type.id,
      scenario: {
        connect: {
          id: props.scenario.id
        }
      }
    },
  }
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const updateOperations = (props) => {
  return (cache, { data: { createOperationsDefinitionClass } }) => {
    let { operationsDefinitionClasses } = cache.readQuery({ query: OPERATIONS });
    operationsDefinitionClasses = [createOperationsDefinitionClass, ...operationsDefinitionClasses];
    cache.writeQuery({ query: OPERATIONS, data: { operationsDefinitionClasses } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId && props.getFormValues().type.id !== '') },
  message: 'An operation code and operation type must be filled in!'
},{
  function: (variables, props) => {
    const operation = props.operations && props.operations.find( (ope) => props.getFormValues().externalId.trim() === ope.externalId.trim() );
    if(operation) { return false; }
  }, message: 'An operation code is already exists!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_OPERATION,
  propName: 'create',
  update: updateOperations,
  validations,
})(withQuery({
  query: LOCATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'hierarchyScopes',
})(OperationForm))));