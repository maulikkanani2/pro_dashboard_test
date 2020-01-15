import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_ORDER } from '../../../graphql/mutations/orders';
import { ORDERS } from '../../../graphql/queries/orders';
import withDelete from '../../../wrappers/delete';
import withDialog from '../../../wrappers/dialog';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';

const OrderDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
  const handler = () => {
    remove.execute().then(() => {
      updateDialog(null);
    });
  }

  return (
    <DeleteMenuItem
      handler={handler}
      closeMenu={closeMenu} />
  );
};

const mapPropsToWhere = props => ({
  where: { id: props.order.id }
});

const updateOrders = (props) => {
  return (cache, { data: { deleteOrder } }) => {
    let { orders } = cache.readQuery({ query: ORDERS });
    orders = orders.filter(order => order.id !== deleteOrder.id);
    cache.writeQuery({ query: ORDERS, data: { orders } });
  };
};

OrderDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('orders')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_ORDER,
    update: updateOrders,
  })(OrderDeleteMenuItem)));
