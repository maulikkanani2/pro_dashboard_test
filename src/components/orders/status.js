import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_ORDER } from '../../graphql/mutations/orders';
import { ORDER_STATUSES } from '../../graphql/queries/orderStatuses';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import withEditing from '../../wrappers/edit';

const OrderStatus = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  const findStatus = event => props.orderStatuses.data.find(status => status.id === event.target.value);

  const options = props.orderStatuses.data ? props.orderStatuses.data : [];

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    displayField="status"
    selected={props.formValues.status}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('status', selectToValue(findStatus), onSave)}
  />);
};

const mapPropsToFields = props => ({
  status: props.order.status,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.order.id },
  data: { status: { connect: { id: props.getFormValues().status.id } } },
});

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
});

OrderStatus.propTypes = {
  order: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OrderStatus.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_ORDER,
  propName: 'update',
})(withQuery({
  mapToFilter: mapToQueryFilter,
  query: ORDER_STATUSES,
  propName: 'orderStatuses',
})(OrderStatus)))));
