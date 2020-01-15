import React from 'react';
import PropTypes from 'prop-types';

import EditableDate from '../fields/editableDate';
import { UPDATE_ORDER } from '../../graphql/mutations/orders';
import withForm from '../../wrappers/form';
import { dateToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';
import { DATE_FORMAT } from '../../constants';

const OrderEarliestStartDate = (props) => {
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
  date: props.order.earliestStartDate,
});

const mapPropsToVariables = props => ({
  where: { id: props.order.id },
  data: { earliestStartDate: props.getFormValues().date },
});

const validations = [{
  function: (variables, props) => { return props.getFormValues().date < new Date(props.order.date); },
  message: 'Earliest start date must be before due date',
}];

OrderEarliestStartDate.propTypes = {
  order: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OrderEarliestStartDate.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_ORDER,
    propName: 'update',
    validations,
  })(OrderEarliestStartDate)));

