import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_ORDER } from '../../graphql/mutations/orders';
import { ORDER_PRIORITIES } from '../../constants';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withEditing from '../../wrappers/edit';

const OrderPriority = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }
  
  const options = Object.keys(ORDER_PRIORITIES).map((priority) => ({ id: parseInt(priority, 10), name: ORDER_PRIORITIES[priority] }));

  const findPriority = (event) => {
    return options.find(priority => priority.id === event.target.value);
  }

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    selected={props.formValues.priority}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('priority', selectToValue(findPriority), onSave)}
  />);
}

const mapPropsToFields = props => {
  if (props.order.priority) {
    return {
      priority: { 
        id: props.order.priority || '', 
        name: props.order.priority ? ORDER_PRIORITIES[props.order.priority] : '',
      }
    }
  }
  return { priority: null }
};

const mapPropsToMutationVariables = props => ({
  where: { id: props.order.id },
  data: { priority: props.getFormValues().priority.id },
});

OrderPriority.propTypes = {
  order: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OrderPriority.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToMutationVariables, { 
    mutation: UPDATE_ORDER,
    propName: 'update',
  })(OrderPriority))));
