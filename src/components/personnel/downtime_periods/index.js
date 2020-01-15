import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import { format } from 'date-fns';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import DowntimePeriodForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';
import { DATE_TIME_FORMAT } from '../../../constants';

const DowntimePeriod = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<DowntimePeriodForm
      person={props.person}
      downtimePeriod={props.downtimePeriod}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{format(props.downtimePeriod.startTime, DATE_TIME_FORMAT)} -> {format(props.downtimePeriod.endTime, DATE_TIME_FORMAT)}</Typography>
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
    downtimePeriods: {
      delete: { id: props.downtimePeriod.id },
    }
  },
  where: { id: props.person.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_PERSON,
})(DowntimePeriod)));
