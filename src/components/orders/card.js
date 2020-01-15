import React from 'react';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import OrderExternalId from './externalId';
import OrderDueDate from './dueDate';
import Menu from '../menu';
import OrderDeleteMenuItem from './menu/delete';
import OrderEditMenuItem from './menu/edit';
import { ORDER_PRIORITIES } from '../../constants';
import Card, { CardAvatar, CardChip } from '../card';

const OrderCard = ({ order, classes }) => {
  return (
  <Card>
    <Box flex="2" justifyContent="flex-start" alignItems="center">
      <CardAvatar tooltip={order.orderProperties.length &&
        <table>
          <tbody>
            {order.orderProperties.map((property) => {
              return (
                <tr key={property.id}>
                  <td style={{ fontWeight: 500, fontSize: '0.75rem' }}>{property.externalId.toUpperCase()}:</td>
                  <td style={{ fontSize: '0.7rem' }}>{property.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }>{order.externalId.substring(0, 2).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <OrderExternalId order={order} variant="subheading" />
        <OrderDueDate order={order} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      {order.priority != 0 && order.priority && <CardChip label={`${ORDER_PRIORITIES[order.priority]} Priority`} />}
      {order.status && <CardChip label={order.status.status} />}
      <Menu>
        <OrderEditMenuItem order={order} />
        <OrderDeleteMenuItem order={order} />
      </Menu>
    </Box>
  </Card >
)};

export default OrderCard;
