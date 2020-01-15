import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import Form, { FormBody, FormButtons, FormField } from '../../../form';
import withScenario from '../../../../wrappers/scenario';
import withMutation from '../../../../wrappers/mutation';
import withForm from '../../../../wrappers/form';
import withQuery from '../../../../wrappers/query';
import { selectToValue, eventToValue } from '../../../../utils/fieldValueMapping';
import { MATERIALS } from '../../../../graphql/queries/materials';
import { MATERIAL_USES } from '../../../../constants';

const RequiredMaterialsForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  const findMaterial = (event) => {
    return props.materialDefinitions.data.find((material) => material.id === event.target.value);
  }

  const findUse = (event) => {
    return MATERIAL_USES.find((use) => use.id === event.target.value);
  }

  if (props.materialDefinitions.loading || !props.materialDefinitions.data) { return null; }

  return (
    <Form>
      <FormBody>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Material</InputLabel>
            <Select fullWidth value={props.formValues.material.id} onChange={props.onFieldChange('material', selectToValue(findMaterial))}>
              {props.materialDefinitions.data.map((material) => { return <MenuItem key={material.id} value={material.id}>{material.externalId}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Use</InputLabel>
            <Select fullWidth value={props.formValues.use.id} onChange={props.onFieldChange('use', selectToValue(findUse))}>
              {MATERIAL_USES.map((use) => { return <MenuItem key={use.id} value={use.id}>{use.name}</MenuItem> })}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <TextField
            fullWidth
            label="Quantity"
            value={props.formValues.quantity}
            onChange={props.onFieldChange('quantity', eventToValue)} />
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
  material: props.requiredMaterials ? props.requiredMaterials.materialDefinition : { id: '', externalId: '' },
  use: props.requiredMaterials ? MATERIAL_USES.find((use) => use.id === props.requiredMaterials.materialUse) : { id: '', externalId: '' },
  quantity: props.requiredMaterials ? props.requiredMaterials.quantity : 1,
});

const mapPropsToMutationVariables = props => {
  if (props.requiredMaterials) {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    operationsSegmentMaterialSpecifications: {
                      update: {
                        data: {
                          quantity: props.getFormValues().quantity,
                          materialUse: props.getFormValues().use.id,
                          materialDefinition: {
                            connect: {
                              id: props.getFormValues().material.id
                            }
                          }
                        },
                        where: { id: props.requiredMaterials.id }
                      }
                    }
                  },
                  where: { id: props.routing.operationsSegments[0].id }
                }
              }
            },
            where: { id: props.routing.id },
          }
        }
      }
    }
  } else {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    operationsSegmentMaterialSpecifications: {
                      create: {
                        quantity: props.getFormValues().quantity,
                        materialUse: props.getFormValues().use.id,
                        materialDefinition: {
                          connect: {
                            id: props.getFormValues().material.id
                          }
                        }
                      }
                    }
                  },
                  where: { id: props.routing.operationsSegments[0].id }
                }
              }
            },
            where: { id: props.routing.id },
          }
        }
      }
    }
  }
};

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id }
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().material.id !== '' && props.getFormValues().use.id !== '' && props.getFormValues().quantity) },
  message: 'All fields are required to be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().quantity > 0 },
  message: 'Quantity must be greater than 0!'
}];

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
  validations,
})(withQuery({
  query: MATERIALS,
  mapToFilter: mapToQueryFilter,
  propName: 'materialDefinitions',
})(RequiredMaterialsForm))));
