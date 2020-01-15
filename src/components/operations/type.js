import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_OPERATION } from '../../graphql/mutations/operations';
import { OPERATIONS_TYPES } from '../../constants';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withEditing from '../../wrappers/edit';

const OperationType = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  const options = OPERATIONS_TYPES;

  const findType = (event) => {
    return options.find(type => type.id === event.target.value);
  }

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    selected={props.formValues.type}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('type', selectToValue(findType), onSave)}
  />);
}

const mapPropsToFields = props => {
  const operationsType = OPERATIONS_TYPES.find((type) => type.id === props.operation.operationsType);

  if (operationsType) {
    return {
      type: {
        id: operationsType.id,
        name: operationsType.name
      }
    }
  } else {
    return {
      type: null
    }
  }
}

const mapPropsToMutationVariables = props => ({
  where: { id: props.operation.id },
  data: { operationsType: props.getFormValues().type.id },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().type.id !== '') },
  message: 'An operation type must be filled in!'
}];

OperationType.propTypes = {
  operation: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OperationType.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToMutationVariables, {
    mutation: UPDATE_OPERATION,
    propName: 'update',
    validations,
  })(OperationType))));
