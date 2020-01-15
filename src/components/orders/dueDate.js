import React from 'react';
import PropTypes from 'prop-types';

import EditableDate from '../fields/editableDate';
import { UPDATE_ORDER } from '../../graphql/mutations/orders';
import withForm from '../../wrappers/form';
import { dateToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';
import { DATE_FORMAT } from '../../constants';

const OrderDueDate = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableDate
    editing={props.isEditing}
    onClick={props.toggleEditing(true)}
    format={DATE_FORMAT}
    date={props.formValues.date}
    variant={props.variant}
    onChange={props.onFieldChange('date', dateToValue, onSave)}
  />);
}

const mapPropsToFields = props => ({
  date: props.order.date,
});

const mapPropsToVariables = props => ({
  where: { id: props.order.id },
  data: { date: props.getFormValues().date },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().date); },
  message: 'An order\'s due date must be filled in!',
}, {
  function: (variables, props) => { return props.getFormValues().date > new Date(props.order.earliestStartDate) },
  message: 'An order\'s due date must be after it\'s earliest start date!',
}];

OrderDueDate.propTypes = {
  order: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OrderDueDate.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_ORDER,
    propName: 'update',
    validations,
  })(OrderDueDate)));
