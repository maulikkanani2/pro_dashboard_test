import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_EQUIPMENT_CLASS } from '../../graphql/mutations/equipmentClasses';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';
import { LOCATIONS } from '../../graphql/queries/locations';
import { EQUIPMENT_CLASSES } from '../../graphql/queries/equipmentClasses';

const EquipmentClassForm = props => {
  const onSave = () => {
    props.create.execute().then(() => {
      props.onCancel();
    });
  };

  if (props.hierarchyScopes.loading || !props.hierarchyScopes.data) {
    return null;
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)}
            label="Class name"
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
  externalId: '',
});

const mapPropsToMutationVariables = props => {
  return {
    data: {
      externalId: props.getFormValues().externalId,
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

const updateEquipment = props => {
  return (cache, { data: { createEquipmentClass } }) => {
    let { equipmentClasses } = cache.readQuery({ query: EQUIPMENT_CLASSES });
    equipmentClasses = [createEquipmentClass, ...equipmentClasses];
    cache.writeQuery({ query: EQUIPMENT_CLASSES, data: { equipmentClasses } });
  };
};

const validations = [
  {
    function: (variables, props) => {
      return !!props.getFormValues().externalId;
    },
    message: 'A class name must be filled in!',
  },
];

export default withScenario(
  withForm(mapPropsToFields)(
    withMutation(mapPropsToMutationVariables, {
      mutation: CREATE_EQUIPMENT_CLASS,
      propName: 'create',
      update: updateEquipment,
      validations,
    })(
      withQuery({
        query: LOCATIONS,
        mapToFilter: mapToQueryFilter,
        propName: 'hierarchyScopes',
      })(EquipmentClassForm)
    )
  )
);
