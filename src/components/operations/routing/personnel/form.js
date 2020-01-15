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
import { PERSONNEL_CLASSES } from '../../../../graphql/queries/personnelClasses';
import { PERSONNEL } from "../../../../graphql/queries/personnel";
import Klasses from "./classes";

let RequiredPersonnelForm = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.onCancel(); });
  }

  if (props.personnelClasses.loading || !props.personnelClasses.data || props.persons.loading || !props.persons.data) { return null; }

  return (
    <Form>
      <FormBody>
        <Klasses value={props.formValues.klass.id} personnelClasses={props.personnelClasses.data} persons={props.persons.data} onFieldChange={props.onFieldChange} />
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
  klass: props.requiredPersonnel ? props.requiredPersonnel.personnelClass : { id: '', externalId: '' },
  quantity: props.requiredPersonnel ? props.requiredPersonnel.quantity : 1,
  ignoreAvailability: props.requiredPersonnel ? props.requiredPersonnel.ignoreAvailability : false,
});

const mapPropsToMutationVariables = props => {
  if (props.requiredPersonnel) {
    return {
      where: { id: props.operation.id },
      data: {
        operationsDefinitions: {
          update: {
            data: {
              operationsSegments: {
                update: {
                  data: {
                    operationsSegmentPersonnelSpecifications: {
                      update: {
                        data: {
                          quantity: props.getFormValues().quantity,
                          ignoreAvailability: props.getFormValues().ignoreAvailability,
                          personnelClass: {
                            connect: {
                              id: props.getFormValues().klass.id
                            }
                          }
                        },
                        where: { id: props.requiredPersonnel.id }
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
                    operationsSegmentPersonnelSpecifications: {
                      create: {
                        quantity: props.getFormValues().quantity,
                        ignoreAvailability: props.getFormValues().ignoreAvailability,
                        personnelClass: {
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

RequiredPersonnelForm = withQuery({
  query: PERSONNEL,
  propName: 'persons',
  mapToFilter: mapToQueryFilter
})(RequiredPersonnelForm)

export default withScenario(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
  validations,
})(withQuery({
  query: PERSONNEL_CLASSES,
  mapToFilter: mapToQueryFilter,
  propName: 'personnelClasses',
})(RequiredPersonnelForm))));
