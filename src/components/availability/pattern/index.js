import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import { format } from 'date-fns';

import { UPDATE_AVAILABILITY_TEMPLATE } from '../../../graphql/mutations/availabilityTemplates';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import AvailabilityItemForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';
import { TIME_FORMAT, DAYS_OF_THE_WEEK } from '../../../constants';
import { millisecondsToDate } from '../../../utils/date';

const AvailabilityItem = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<AvailabilityItemForm
      availability={props.availability}
      availabilityItem={props.availabilityItem}
      onCancel={props.toggleEditing(false)} />
    );
  }

  const dayOfTheWeek = DAYS_OF_THE_WEEK.find(dotw => dotw.id === props.availabilityItem.dayOfTheWeek);

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{dayOfTheWeek.name} {format(millisecondsToDate(props.availabilityItem.startTime), TIME_FORMAT)} -> {format(millisecondsToDate(props.availabilityItem.endTime), TIME_FORMAT)}</Typography>
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
    availabilityTemplateItems: {
      delete: { id: props.availabilityItem.id },
    }
  },
  where: { id: props.availability.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_AVAILABILITY_TEMPLATE,
})(AvailabilityItem)));
