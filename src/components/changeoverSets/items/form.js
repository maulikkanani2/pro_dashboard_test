import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_CHANGEOVER_SET } from '../../../graphql/mutations/changeoverSets';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { eventToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { OPTIMISATION_PROPERTIES } from '../../../graphql/queries/optimisationProperties';
import { CHANGEOVER_OPERATIONS } from '../../../graphql/queries/operations';

const ChangeoverSetItemForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findOptimisationProperty = (event) => {
    const a = props.optimisationProperties.data.find((property) => property.id === event.target.value);
    console.log(a);
    return a;
  }

  const findOptimisationPropertyValue = (event) => {
    return props.formValues.property.optimisationPropertyValues.find((value) => value.id === event.target.value);
  }

  const findOperation = (event) => {
    return props.operationsDefinitionClasses.data.find((property) => property.id === event.target.value);
  }

  const findOperationRoute = (event) => {
    return props.formValues.operation.operationsDefinitions.find((route) => route.id === event.target.value);
  }

  if (props.optimisationProperties.loading || !props.optimisationProperties.data) { return null; }
  if (props.operationsDefinitionClasses.loading || !props.operationsDefinitionClasses.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Optimisation Property</InputLabel>
            <Select
              fullWidth
              value={props.formValues.property.id}
              onChange={props.onFieldChange('property', selectToValue(findOptimisationProperty))}>
              {props.optimisationProperties.data.map((property) => { return <MenuItem key={property.id} value={property.id}>{property.name}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>From Value</InputLabel>
            <Select
              fullWidth
              value={props.formValues.fromValue.id}
              onChange={props.onFieldChange('fromValue', selectToValue(findOptimisationPropertyValue))}>
              {props.formValues.property.optimisationPropertyValues.map((value) => { return <MenuItem key={value.id} value={value.id}>{value.value}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>To Value</InputLabel>
            <Select
              fullWidth
              value={props.formValues.toValue.id}
              onChange={props.onFieldChange('toValue', selectToValue(findOptimisationPropertyValue))}>
              {props.formValues.property.optimisationPropertyValues.map((value) => { return <MenuItem key={value.id} value={value.id}>{value.value}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              fullWidth
              value={props.formValues.operation.id}
              onChange={props.onFieldChange('operation', selectToValue(findOperation))}>
              {props.operationsDefinitionClasses.data.map((klass) => { return <MenuItem key={klass.id} value={klass.id}>{klass.externalId}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Route</InputLabel>
            <Select
              fullWidth
              value={props.formValues.route.id}
              onChange={props.onFieldChange('route', selectToValue(findOperationRoute))}>
              {props.formValues.operation.operationsDefinitions.map((route) => { return <MenuItem key={route.id} value={route.id}>{route.externalId}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <TextField
            fullWidth
            type="number"
            value={props.formValues.time}
            onChange={props.onFieldChange('time', eventToValue)}
            label="Time" />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.update.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form >
  );
}

const mapPropsToFields = props => ({
  operation: props.changeoverSetItem ? props.changeoverSetItem.operationsSegment.operationsDefinition.operationsDefinitionClass : { id: '', externalId: '', operationsDefinitions: [] },
  route: props.changeoverSetItem ? props.changeoverSetItem.operationsSegment.operationsDefinition : { id: '', externalId: '' },
  property: props.changeoverSetItem ? props.changeoverSetItem.fromValue.optimisationProperty : { id: '', name: '', optimisationPropertyValues: [] },
  fromValue: props.changeoverSetItem ? props.changeoverSetItem.fromValue : { id: '', value: '' },
  toValue: props.changeoverSetItem ? props.changeoverSetItem.toValue : { id: '', value: '' },
  time: props.changeoverSetItem ? props.changeoverSetItem.time : 0,
});

const mapPropsToMutationVariables = props => {
  if (props.changeoverSetItem) {
    return {
      data: {
        changeoverSetItems: {
          update: {
            data: {
              operationsSegment: {
                connect: { id: props.getFormValues().route.id ? props.getFormValues().route.operationsSegments[0].id : null }
              },
              fromValue: {
                connect: { id: props.getFormValues().fromValue.id }
              },
              toValue: {
                connect: { id: props.getFormValues().toValue.id }
              },
              property: props.getFormValues().property.name,
              time: props.getFormValues().time,
            },
            where: { id: props.changeoverSetItem.id }
          }
        }
      },
      where: { id: props.changeoverSet.id }
    }
  } else {
    return {
      data: {
        changeoverSetItems: {
          create: {
            operationsSegment: {
              connect: { id: props.getFormValues().route.id ? props.getFormValues().route.operationsSegments[0].id : null }
            },
            fromValue: {
              connect: { id: props.getFormValues().fromValue.id }
            },
            toValue: {
              connect: { id: props.getFormValues().toValue.id }
            },
            property: props.getFormValues().property.name,
            time: props.getFormValues().time,
          }
        }
      },
      where: { id: props.changeoverSet.id }
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().time) && !!(props.getFormValues().fromValue.id) && !!(props.getFormValues().toValue.id) && !!(props.getFormValues().route.id) && !!(props.getFormValues().property.id) },
  message: 'All fields must be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().time > 0 },
  message: 'Changeover time must be greater than 0!'
}];

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
  operationsType: 'WORK',
});

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_CHANGEOVER_SET,
  propName: 'update',
  validations,
})(withQuery({
  query: OPTIMISATION_PROPERTIES,
  mapToFilter: mapToQueryFilter,
  propName: 'optimisationProperties',
})(withQuery({
  query: CHANGEOVER_OPERATIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'operationsDefinitionClasses',
})(ChangeoverSetItemForm)))));
