import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form, { FormBody, FormButtons, FormField } from '../../form';
import { eventToValue } from '../../../utils/fieldValueMapping';

import { UPDATE_MATERIAL } from '../../../graphql/mutations/materials';
import { withMutation, withScenario, withForm } from '../../../wrappers';


const MaterialPropertyForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  if (props.material.loading) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            label='Name'
            value={props.formValues.externalId}
            onChange={props.onFieldChange('externalId', eventToValue)} />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            label='Value'
            value={props.formValues.value}
            onChange={props.onFieldChange('value', eventToValue)} />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.update.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

MaterialPropertyForm.propTypes = {
  material: PropTypes.object.required,
  materialProperty: PropTypes.object
}

const mapPropsToFields = props => ({
  externalId: props.materialProperty ? props.materialProperty.externalId : '',
  value: props.materialProperty ? props.materialProperty.value : '',
});

const mapPropsToMutationVariables = props => {
  if (props.materialProperty) {
    return {
      where: { id: props.material.id },
      data: {
        materialProperties: {
          update: {
            data: {
              externalId: props.getFormValues().externalId,
              value: props.getFormValues().value
            },
            where: { id: props.materialProperty.id },
          },
        }
      }
    }
  } else {
    return {
      where: { id: props.material.id },
      data: {
        materialProperties: {
          create: {
            externalId: props.getFormValues().externalId,
            value: props.getFormValues().value
          },
        }
      }
    }
  }
};

const validations = [{
  function: (variables, props) => { return (props.getFormValues().externalId !== '' && props.getFormValues().value !== '') },
  message: 'Value should be filled in.'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_MATERIAL,
  propName: 'update',
  validations,
})(MaterialPropertyForm)));