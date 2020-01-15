import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { CREATE_PERSONNEL_CLASS } from '../../graphql/mutations/personnelClasses';
import Form, { FormBody, FormButtons, FormField } from '../form';
import withScenario from '../../wrappers/scenario';
import withMutation from '../../wrappers/mutation';
import withForm from '../../wrappers/form';
import withQuery from '../../wrappers/query';
import { eventToValue, selectToValue } from '../../utils/fieldValueMapping';
import { LOCATIONS } from '../../graphql/queries/locations';
import { PERSONNEL_CLASSES } from '../../graphql/queries/personnelClasses';

const PersonnelClassForm = props => {
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
            label="Class Name"
          />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button color="primary" size="small" onClick={onSave}>
          Save
        </Button>
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

const updatePersonnel = props => {
  return (cache, { data: { createPersonnelClass } }) => {
    let { personnelClasses } = cache.readQuery({ query: PERSONNEL_CLASSES });
    personnelClasses = [createPersonnelClass, ...personnelClasses];
    cache.writeQuery({ query: PERSONNEL_CLASSES, data: { personnelClasses } });
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
      mutation: CREATE_PERSONNEL_CLASS,
      propName: 'create',
      update: updatePersonnel,
      validations,
    })(
      withQuery({
        query: LOCATIONS,
        mapToFilter: mapToQueryFilter,
        propName: 'hierarchyScopes',
      })(PersonnelClassForm)
    )
  )
);
