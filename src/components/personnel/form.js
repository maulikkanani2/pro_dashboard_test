import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_PERSON } from '../../graphql/mutations/personnel';
import { PERSONNEL } from '../../graphql/queries/personnel';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';
import { LOCATIONS } from '../../graphql/queries/locations';
import { PERSONNEL_CLASSES } from '../../graphql/queries/personnelClasses';

const PersonForm = (props) => {
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
            label="Personnel Code" />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.name}
            onChange={props.onFieldChange('name', eventToValue)}
            label="Name" />
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
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
  name: '',
  externalId: '',
  location: { id: '', externalId: '' },
});

const mapPropsToMutationVariables = props => {
  const location = props.getFormValues().location.id ? { connect: { id: props.getFormValues().location.id } } : null;

  return {
    data: {
      externalId: props.getFormValues().externalId,
      name: props.getFormValues().name,
      personnelClasses: {
        create: {
          externalId: props.getFormValues().externalId,
          scenario: {
            connect: {
              id: props.scenario.id
            }
          }
        },
      },
      calendarisedAvailabilityTemplateSet: {
        create: {
          name: props.getFormValues().externalId,
          scenario: {
            connect: {
              id: props.scenario.id
            }
          }
        },
      },
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
  scenario: { id: props.scenario.id },
});

const updatePersonnel = (props) => {
  return (cache, { data: { createPerson } }) => {
    let { persons } = cache.readQuery({ query: PERSONNEL });
    persons = [createPerson, ...persons];
    cache.writeQuery({ query: PERSONNEL, data: { persons } });

    let { personnelClasses } = cache.readQuery({ query: PERSONNEL_CLASSES });
    personnelClasses = [createPerson.personnelClasses[0], ...personnelClasses];
    cache.writeQuery({ query: PERSONNEL_CLASSES, data: { personnelClasses } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A personnel code is must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_PERSON,
  propName: 'create',
  update: updatePersonnel,
  validations,
})(withQuery({
  query: LOCATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'hierarchyScopes',
})(PersonForm))));
