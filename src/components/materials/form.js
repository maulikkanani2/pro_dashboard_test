import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_MATERIAL } from '../../graphql/mutations/materials';
import { MATERIALS } from '../../graphql/queries/materials';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';
import { LOCATIONS } from '../../graphql/queries/locations';

const MaterialForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  }

  const findLocation = (event) => {
    return props.hierarchyScopes.data.find((location) => location.id === event.target.value);
  }

  if (props.hierarchyScopes.loading || !props.hierarchyScopes) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Material Code" />
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
            <Select fullWidth value={props.formValues.location ? props.formValues.location.id : ""} onChange={props.onFieldChange('location', selectToValue(findLocation))}>
              {
                props.hierarchyScopes.data.length === 0 ?
                  <MenuItem value="" selected={true}>No Location</MenuItem> : ''
              }
              {props.hierarchyScopes.data.map(location => <MenuItem key={location.id} value={location.id}>{location.externalId}</MenuItem>)}
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
  location: null,
});

const mapPropsToMutationVariables = props => {
  const location = props.getFormValues().location ? { connect: { id: props.getFormValues().location.id } } : null;

  return {
    data: {
      externalId: props.getFormValues().externalId,
      description: props.getFormValues().description,
      hierarchyScope: location,
      scenario: {
        connect: {
          id: props.scenario.id
        }
      }
    },
  };
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const updateMaterials = (props) => {
  return (cache, { data: { createMaterialDefinition } }) => {
    let { materialDefinitions } = cache.readQuery({ query: MATERIALS });
    materialDefinitions = [createMaterialDefinition, ...materialDefinitions];
    cache.writeQuery({ query: MATERIALS, data: { materialDefinitions } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A material code must be filled in!'
}, {
  function: (variables, props) => {
    const material = props.materials.length && props.materials.find((material) => material.externalId === props.formValues.externalId.trim());
    if (material) { return false; }
  }, message: 'A material code is already exists.'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_MATERIAL,
  propName: 'create',
  update: updateMaterials,
  validations,
})(withQuery({
  query: LOCATIONS,
  propName: 'hierarchyScopes',
  mapToFilter: mapToQueryFilter,
})(MaterialForm))));
