import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import { format } from 'date-fns';

import { UPDATE_SCENARIO } from '../../../graphql/mutations/scenarios';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import TimePeriodForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';
import { DATE_FORMAT } from '../../../constants';

const TimePeriod = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<TimePeriodForm
      scenario={props.scenario}
      timePeriod={props.timePeriod}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{format(props.timePeriod.startTime, DATE_FORMAT)} -> {format(props.timePeriod.endTime, DATE_FORMAT)}</Typography>
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
    timePeriods: {
      delete: { id: props.timePeriod.id },
    }
  },
  where: { id: props.scenario.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_SCENARIO,
})(TimePeriod)));
