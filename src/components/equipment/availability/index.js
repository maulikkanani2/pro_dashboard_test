import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import { format } from 'date-fns';

import { UPDATE_EQUIPMENT } from '../../../graphql/mutations/equipment';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import AvailabilityForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';
import { DATE_FORMAT } from '../../../constants';

const Availability = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<AvailabilityForm
      equipment={props.equipment}
      availability={props.availability}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.availability.availabilityTemplate.name} - {format(props.availability.startTime, DATE_FORMAT)} -> {format(props.availability.endTime, DATE_FORMAT)}</Typography>
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
    calendarisedAvailabilityTemplateSet: {
      update: {
        calendarisedAvailabilityTemplateSetItems: {
          delete: { id: props.availability.id },
        }
      }
    }
  },
  where: { id: props.equipment.id }
});


export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_EQUIPMENT,
})(Availability)));
