import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import { withDelete, withEditing, withHover } from '../../../../wrappers';
import RequiredEquipmentForm from './form';
import Field, { FieldControl, FieldIcon } from '../../../field';
import Box from '../../../layout/Box';

const RequiredEquipment = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<RequiredEquipmentForm
      requiredEquipment={props.requiredEquipment}
      excludedEquipments={props.excludedEquipments}
      routing={props.routing}
      operation={props.operation}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.requiredEquipment.quantity} x {props.requiredEquipment.equipmentClass.externalId}</Typography>
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
    operationsDefinitions: {
      update: {
        data: {
          operationsSegments: {
            update: {
              data: {
                operationsSegmentEquipmentSpecifications: {
                  delete: { id: props.requiredEquipment.id },
                },
              },
              where: { id: props.routing.operationsSegments[0].id }
            },
          },
        },
        where: { id: props.routing.id },
      },
    },
  },
  where: { id: props.operation.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_OPERATION,
})(RequiredEquipment)));
