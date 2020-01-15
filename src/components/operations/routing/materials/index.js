import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import withDelete from '../../../../wrappers/delete';
import withEditing from '../../../../wrappers/edit';
import withHover from '../../../../wrappers/hover';
import RequiredMaterialsForm from './form';
import Field, { FieldControl, FieldIcon } from '../../../field';
import Box from '../../../layout/Box';

const RequiredMaterials = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<RequiredMaterialsForm
      requiredMaterials={props.requiredMaterials}
      routing={props.routing}
      operation={props.operation}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.requiredMaterials.quantity} x {props.requiredMaterials.materialDefinition.externalId} ({props.requiredMaterials.materialUse})</Typography>
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
                operationsSegmentMaterialSpecifications: {
                  delete: { id: props.requiredMaterials.id },
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
})(RequiredMaterials)));
