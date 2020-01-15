import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import withDelete from '../../../../wrappers/delete';
import withEditing from '../../../../wrappers/edit';
import withHover from '../../../../wrappers/hover';
import RequiredPersonnelForm from './form';
import Field, { FieldControl, FieldIcon } from '../../../field';
import Box from '../../../layout/Box';

const RequiredPersonnel = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<RequiredPersonnelForm
      requiredPersonnel={props.requiredPersonnel}
      routing={props.routing}
      operation={props.operation}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.requiredPersonnel.quantity} x {props.requiredPersonnel.personnelClass.externalId}</Typography>
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
                operationsSegmentPersonnelSpecifications: {
                  delete: { id: props.requiredPersonnel.id },
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
})(RequiredPersonnel)));