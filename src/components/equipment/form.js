import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_EQUIPMENT } from '../../graphql/mutations/equipment';
import { EQUIPMENTS } from '../../graphql/queries/equipment';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';
import { LOCATIONS } from '../../graphql/queries/locations';
import { EQUIPMENT_CLASSES } from '../../graphql/queries/equipmentClasses';

const EquipmentForm = (props) => {
  const onSave = () => {
    props.create.execute().then(() => { props.onCancel(); });
  };

  const findLocation = event => props.hierarchyScopes.data.find(location => location.id === event.target.value);
  if (props.hierarchyScopes.loading || !props.hierarchyScopes.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Equipment Code"
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
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select fullWidth value={props.formValues.location ? props.formValues.location.id : ""} onChange={props.onFieldChange('location', selectToValue(findLocation))}>
              {
                props.hierarchyScopes.data.length === 0 ?
                  <MenuItem value="" selected>No Location</MenuItem> : ''
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
};

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
      equipmentClasses: {
        create: {
          externalId: props.getFormValues().externalId,
          scenario: {
            connect: {
              id: props.scenario.id
            }
          },
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
          id: props.scenario.id,
        },
      },
    },
  };
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
});

const updateEquipments = (props) => {
  return (cache, { data: { createEquipment } }) => {
    let { equipments } = cache.readQuery({ query: EQUIPMENTS });
    equipments = [createEquipment, ...equipments];
    cache.writeQuery({ query: EQUIPMENTS, data: { equipments } });

    let { equipmentClasses } = cache.readQuery({ query: EQUIPMENT_CLASSES });
    equipmentClasses = [createEquipment.equipmentClasses[0], ...equipmentClasses];
    cache.writeQuery({ query: EQUIPMENT_CLASSES, data: { equipmentClasses } });
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'An equipment code must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: CREATE_EQUIPMENT,
  propName: 'create',
  update: updateEquipments,
  validations,
})(withQuery({
  query: LOCATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'hierarchyScopes',
})(EquipmentForm))));
