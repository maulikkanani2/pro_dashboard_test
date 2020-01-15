import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_OPTIMISATION_HIERARCHY } from '../../../graphql/mutations/optimisationHierarchies';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { eventToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { OPTIMISATION_PROPERTIES } from '../../../graphql/queries/optimisationProperties';

const OptimisationHierarchyPriorityForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findOptimisationProperty = (event) => {
    return props.optimisationProperties.data.find((property) => property.id === event.target.value);
  }

  if (props.optimisationProperties.loading || !props.optimisationProperties.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Optimisation Property</InputLabel>
            <Select fullWidth value={props.formValues.property.id} onChange={props.onFieldChange('property', selectToValue(findOptimisationProperty))}>
              {props.optimisationProperties.data.map((property) => { return <MenuItem key={property.id} value={property.id}>{property.name}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <TextField
            fullWidth
            type="number"
            value={props.formValues.priority}
            onChange={props.onFieldChange('priority', eventToValue)}
            label="Priority" />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.update.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

const mapPropsToFields = props => ({
  property: props.priority ? props.priority.optimisationProperty : { id: '', name: '' },
  priority: props.priority ? props.priority.priority : 0,
});

const mapPropsToMutationVariables = props => {
  if (props.priority) {
    return {
      where: { id: props.optimisationHierarchy.id },
      data: {
        optimisationHierarchyAttributes: {
          update: {
            data: {
              priority: props.getFormValues().priority,
              optimisationProperty: {
                connect: { id: props.getFormValues().property.id },
              },
            },
            where: { id: props.priority.id },
          }
        }
      }
    };
  } else {
    return {
      where: { id: props.optimisationHierarchy.id },
      data: {
        optimisationHierarchyAttributes: {
          create: {
            priority: props.getFormValues().priority,
            optimisationProperty: {
              connect: { id: props.getFormValues().property.id },
            },
          },
        },
      },
    };
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().property.id) && !!(props.getFormValues().priority) },
  message: 'All fields must be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().priority > 0 },
  message: 'Priority must be greater than 0!'
}];

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPTIMISATION_HIERARCHY,
  propName: 'update',
  validations,
})(withQuery({
  query: OPTIMISATION_PROPERTIES,
  mapToFilter: mapToQueryFilter,
  propName: 'optimisationProperties',
})(OptimisationHierarchyPriorityForm))));
