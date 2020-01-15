import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker';

import { UPDATE_OPTIMISATION_PROPERTY } from '../../../graphql/mutations/optimisationProperties';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { colourToValue, eventToValue } from '../../../utils/fieldValueMapping';

const rgbToText = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const textToRgb = (text) => {
  const regex = /rgb\((\d+), (\d+), (\d+)\)/
  const [_, r, g, b] = regex.exec(text);
  return { r, g, b };
}

const OptimisationPropertyValueForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  return (
    <Form>
      <FormBody>
        <FormField>
          <TextField
            fullWidth
            value={props.formValues.value}
            onChange={props.onFieldChange('value', eventToValue)}
            label="Property Value" />
        </FormField>
        <FormField>
          <ColorPicker
            fullWidth
            defaultValue={props.formValues.colour}
            onChange={props.onFieldChange('colour', colourToValue)}
            convert="rgb"
            label="Colour" />
        </FormField>
      </FormBody>
      <FormButtons>
        <Button size="small" onClick={props.onCancel}>Cancel</Button>
        <Button disabled={props.update.loading} color="primary" size="small" onClick={onSave}>Save</Button>
      </FormButtons>
    </Form>
  );
}

const mapPropsToFields = props => {
  const colour = props.value && props.value.colourSchemeItem;

  return {
    value: props.value ? props.value.value : '',
    colour: rgbToText(props.value ? { r: colour.red, b: colour.blue, g: colour.green } : { r: 0, b: 0, g: 0 }),
  }
};

const mapPropsToMutationVariables = props => {
  const data = textToRgb(props.getFormValues().colour);

  if (props.value) {
    return {
      where: { id: props.optimisationProperty.id },
      data: {
        optimisationPropertyValues: {
          update: {
            data: {
              value: props.getFormValues().value,
              colourSchemeItem: {
                update: {
                  red: data.r,
                  green: data.g,
                  blue: data.b,
                }
              },
            },
            where: { id: props.value.id },
          }
        }
      },
    }
  } else {
    return {
      where: { id: props.optimisationProperty.id },
      data: {
        optimisationPropertyValues: {
          create: {
            value: props.getFormValues().value,
            colourSchemeItem: {
              create: {
                red: data.r,
                green: data.g,
                blue: data.b,
              }
            },
          }
        },
      }
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().value.trim()) },
  message: 'A value must be filled in!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPTIMISATION_PROPERTY,
  propName: 'update',
  validations,
})(OptimisationPropertyValueForm)));
