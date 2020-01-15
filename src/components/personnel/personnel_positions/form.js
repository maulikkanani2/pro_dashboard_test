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
import { PERSONNEL_POSITIONS } from '../../../graphql/queries/personnelPositions';

const PersonnelPositionForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findPosition = (event) => {
    return props.personnelPositions.data.find((position) => position.id === event.target.value);
  }

  if (props.personnelPositions.loading || !props.personnelPositions.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Position</InputLabel>
            <Select fullWidth value={props.formValues.position.id} onChange={props.onFieldChange('position', selectToValue(findPosition))}>
              {props.personnelPositions.data.map((position) => { return <MenuItem key={position.id} value={position.id}>{position.externalId}</MenuItem> })}
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
  position: { id: '', externalId: '' },
});

const mapPropsToMutationVariables = props => {
  return {
    where: { id: props.person.id },
    data: {
      personnelPositions: {
        connect: {
          id: props.getFormValues().position.id
        },
      },
    }
  }
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().position.id !== '') },
  message: 'All fields are required to be filled!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_PERSON,
  propName: 'update',
  validations,
})(withQuery({
  query: PERSONNEL_POSITIONS,
  mapToFilter: mapToQueryFilter,
  propName: 'personnelPositions',
})(PersonnelPositionForm))));
