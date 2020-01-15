import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import StatusIcon from '@material-ui/icons/Info';
import PriorityIcon from '@material-ui/icons/PriorityHigh';
import DateIcon from '@material-ui/icons/DateRange';
import TimeIcon from '@material-ui/icons/AccessTime';

import { ORDER } from '../../../graphql/queries/orders';
import OrderExternalId from '../externalId';
import OrderDueDate from '../dueDate';
import OrderStatus from '../status';
import OrderPriority from '../priority';
import OrderEarliestStartDate from '../earliestStartDate';
import OrderItem from '../items';
import OrderItemAdd from '../items/add';
import OrderProperties from '../properties';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import OrderDeleteMenuItem from '../menu/delete';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';

class OrderDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, order: { data: order, loading } } = this.props;

    if (!order) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{order.externalId.substring(0, 2).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <OrderExternalId variant="title" order={order} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <OrderDeleteMenuItem order={order} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <VBox fit>
            <DialogColumn width="100%">
              <Box fit justifyContent="space-between">
                <DialogColumn width="47.5%">
                  <FieldControl>
                    <FieldLabel label="Status" />
                    <Field>
                      <OrderStatus order={order} variant="body1" />
                      <FieldIcon><StatusIcon /></FieldIcon>
                    </Field>
                  </FieldControl>
                  <FieldControl>
                    <FieldLabel label="Priority" />
                    <Field>
                      <OrderPriority order={order} variant="body1" />
                      <FieldIcon><PriorityIcon /></FieldIcon>
                    </Field>
                  </FieldControl>
                </DialogColumn>
                <DialogColumn width="47.5%">
                  <FieldControl>
                    <FieldLabel label="Due Date" />
                    <Field>
                      <OrderDueDate order={order} variant="body1" />
                      <FieldIcon><DateIcon /></FieldIcon>
                    </Field>
                  </FieldControl>
                  <FieldControl>
                    <FieldLabel label="Earliest Start Date" />
                    <Field>
                      <OrderEarliestStartDate order={order} variant="body1" />
                      <FieldIcon><TimeIcon /></FieldIcon>
                    </Field>
                  </FieldControl>
                </DialogColumn>
              </Box>
            </DialogColumn>
            <DialogColumn width="100%">
              <FieldControl>
                <FieldLabel label="Items" />
                <VBox>
                  {order.orderItems.map((item) => <OrderItem key={item.id} orderItem={item} order={order} />)}
                  <OrderItemAdd order={order} />
                </VBox>
              </FieldControl>
            </DialogColumn>
            <DialogColumn width="100%">
              <FieldControl>
                <FieldLabel label="Additional Properties" />
                <VBox>
                  <OrderProperties order={order} />
                </VBox>
              </FieldControl>
            </DialogColumn>
          </VBox>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.order.id
});

const mapPropsToSkip = props => !props.order;

OrderDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: ORDER,
  propName: 'order'
})(OrderDialog);
