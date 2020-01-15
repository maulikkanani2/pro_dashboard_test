import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_LOCATION } from '../../../graphql/mutations/locations';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { eventToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { LOCATIONS } from '../../../graphql/queries/locations';

const LocationForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  }

  const findLocation = (event) => {
    return props.hierarchyScopes.data.find((location) => location.id === event.target.value);
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
            label="Location Code" />
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Parent Location</InputLabel>
            <Select fullWidth value={props.formValues.location.id} onChange={props.onFieldChange('location', selectToValue(findLocation))}>
              {props.hierarchyScopes.data.map((location) => { return <MenuItem key={location.id} value={location.id}>{location.externalId}</MenuItem> })}
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
  externalId: '',
  location: { id: '', externalId: '' },
});

const mapPropsToMutationVariables = props => {
  const location = props.getFormValues().location.id ? { connect: { id: props.getFormValues().location.id } } : null;

  return {
    data: {
      externalId: props.getFormValues().externalId,
      parent: location,
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

const updateLocations = (props) => {
  return (cache, { data: { createHierarchyScope } }) => {
    let { hierarchyScopes } = cache.readQuery({ query: LOCATIONS });
    hierarchyScopes = [createHierarchyScope, ...hierarchyScopes];
    cache.writeQuery({ query: LOCATIONS, data: { hierarchyScopes } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A location code must be filled in!'
},
{
  function: (variables, props) => {
    const loc = props.hierarchyScopes.data.find((location) => location.externalId === props.getFormValues().externalId.trim());
    return loc ? false : true;
  }, message: 'A location code is already exists!'
}];

export default withScenario(withForm(mapPropsToFields)(withQuery({
  query: LOCATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'hierarchyScopes',
})(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_LOCATION,
  propName: 'create',
  update: updateLocations,
  validations,
})(LocationForm))));
