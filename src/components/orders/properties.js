import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const OrderProperties = (props) => {
  return (
    <Paper>
      <Table>
        <TableBody>
          {props.order.orderProperties.map((property) => {
            return (
              <TableRow key={property.id}>
                <TableCell>{property.externalId.toUpperCase()}</TableCell>
                <TableCell>{property.value}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default OrderProperties;