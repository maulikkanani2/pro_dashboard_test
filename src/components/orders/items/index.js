import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_ORDER } from '../../../graphql/mutations/orders';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import OrderItemForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const OrderItem = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<OrderItemForm order={props.order} orderItem={props.orderItem} onCancel={props.toggleEditing(false)} />);
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.orderItem.quantity} x {props.orderItem.operationsDefinitionClass.externalId}</Typography>
        {
          props.isHovered && <Box flex="1 0 auto" justifyContent="flex-end">
            <FieldIcon><EditIcon onClick={props.toggleEditing(true)} /></FieldIcon>
            <FieldIcon><CrossIcon onClick={onDelete} /></FieldIcon>
          </Box>
        }
      </Field>
    </FieldControl>
  )
}

const mapPropsToDeleteVariables = props => ({
  data: {
    orderItems: {
      delete: { id: props.orderItem.id },
    }
  },
  where: { id: props.order.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_ORDER,
})(OrderItem)));
