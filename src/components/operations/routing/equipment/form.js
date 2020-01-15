import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import Form, { FormBody, FormButtons, FormField } from '../../../form';
import withScenario from '../../../../wrappers/scenario';
import withMutation from '../../../../wrappers/mutation';
import withForm from '../../../../wrappers/form';
import withQuery from '../../../../wrappers/query';
import { eventToValue, checkToValue } from '../../../../utils/fieldValueMapping';
import { EQUIPMENT_CLASSES } from '../../../../graphql/queries/equipmentClasses';
import { EQUIPMENTS } from '../../../../graphql/queries/equipment'
import Klasses from "./classes";

let RequiredEquipmentForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  if (props.equipmentClasses.loading || !props.equipmentClasses.data || props.equipments.loading || !props.equipments.data) { return null; }

  const value = props.formValues.klass.id

  const excludedClassIds = props.excludedEquipments.reduce((accumulator, equipment) => {
    if (equipment.equipmentClass.id !== value) {
      accumulator.push(equipment.equipmentClass.id)
    }

    return accumulator
  }, [])

  return (
    <Form>
      <FormBody>
        <Klasses
          value={value}
          equipmentClasses={props.equipmentClasses.data}
          excludedClassIds={excludedClassIds}
          equipments={props.equipments.data}
          onFieldChange={props.onFieldChange}
        />
        <FormField>
          <TextField
            fullWidth
            label="Quantity"
            value={props.formValues.quantity}
            onChange={props.onFieldChange('quantity', eventToValue)} />
        </FormField>
        <FormField>
          <FormControlLabel
            label="Ignore Availability"
            control={
              <Checkbox
                checked={props.formValues.ignoreAvailability}
                onChange={props.onFieldChange('ignoreAvailability', checkToValue)}
                color="primary" />
            } />
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
  klass: props.requiredEquipment ? props.requiredEquipment.equipmentClass : { id: '', externalId: '' },
  quantity: props.requiredEquipment ? props.requiredEquipment.quantity : 1,
  ignoreAvailability: props.requiredEquipment ? props.requiredEquipment.ignoreAvailability : false,
});

const mapPropsToMutationVariables = props => {
  if (props.requiredEquipment) {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    operationsSegmentEquipmentSpecifications: {
                      update: {
                        data: {
                          quantity: props.getFormValues().quantity,
                          ignoreAvailability: props.getFormValues().ignoreAvailability,
                          equipmentClass: {
                            connect: {
                              id: props.getFormValues().klass.id
                            }
                          }
                        },
                        where: { id: props.requiredEquipment.id }
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
                    operationsSegmentEquipmentSpecifications: {
                      create: {
                        quantity: props.getFormValues().quantity,
                        ignoreAvailability: props.getFormValues().ignoreAvailability,
                        equipmentClass: {
                          connect: {
                            id: props.getFormValues().klass.id
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
  function: (variables, props) => { return !!(props.getFormValues().klass.id !== '' && props.getFormValues().quantity) },
  message: 'All fields are required to be filled in!'
}, {
  function: (variables, props) => { return props.getFormValues().quantity > 0 },
  message: 'Quantity must be greater than 0!'
}];

RequiredEquipmentForm.defaultProps = {
  excludedEquipments: [],
};

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
  validations,
})(withQuery({
  query: EQUIPMENT_CLASSES,
  mapToFilter: mapToQueryFilter,
  propName: 'equipmentClasses',
})(withQuery({
  query: EQUIPMENTS,
  propName: 'equipments',
  mapToFilter: mapToQueryFilter
})(RequiredEquipmentForm)))));
