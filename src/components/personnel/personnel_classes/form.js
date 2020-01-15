import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import withQuery from '../../../wrappers/query';
import { selectToValue } from '../../../utils/fieldValueMapping';
import { PERSONNEL_CLASSES } from '../../../graphql/queries/personnelClasses';

const PersonnelClassForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findClass = (event) => {
    return props.personnelClasses.data.find((klass) => klass.id === event.target.value);
  }

  if (props.personnelClasses.loading || !props.personnelClasses.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select fullWidth value={props.formValues.klass.id} onChange={props.onFieldChange('klass', selectToValue(findClass))}>
              {props.personnelClasses.data.map((klass) => { return <MenuItem key={klass.id} value={klass.id}>{klass.externalId}</MenuItem> })}
            </Select>
          </FormControl>
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
  klass: { id: '', externalId: '' },
});

const mapPropsToMutationVariables = props => {
  return {
    where: { id: props.person.id },
    data: {
      personnelClasses: {
        connect: {
          id: props.getFormValues().klass.id
        },
      },
    }
  }
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().klass.id !== '') },
  message: 'All fields are required to be filled!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_PERSON,
  propName: 'update',
  validations,
})(withQuery({
  query: PERSONNEL_CLASSES,
  mapToFilter: mapToQueryFilter,
  propName: 'personnelClasses',
})(PersonnelClassForm))));
