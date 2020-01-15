import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import { format } from 'date-fns';

import { UPDATE_OPERATION } from '../../../../graphql/mutations/operations';
import withDelete from '../../../../wrappers/delete';
import withEditing from '../../../../wrappers/edit';
import withHover from '../../../../wrappers/hover';
import RoutingThroughputForm from './form';
import Field, { FieldControl, FieldIcon } from '../../../field';
import Box from '../../../layout/Box';
import { DATE_FORMAT } from '../../../../constants';

const RoutingThroughput = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<RoutingThroughputForm
      throughput={props.throughput}
      operation={props.operation}
      routing={props.routing}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{format(props.throughput.startTime, DATE_FORMAT)} -> {format(props.throughput.endTime, DATE_FORMAT)} - {props.throughput.quantity} Units/s</Typography>
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
  where: { id: props.operation.id },
  data: {
    operationsDefinitions: {
      update: {
        data: {
          operationsSegments: {
            update: {
              data: {
                calendarisedThroughputSet: {
                  update: {
                    calendarisedThroughputSetItems: {
                      delete: {
                        id: props.throughput.id,
                      },
                    },
                  },
                },
              },
              where: { id: props.routing.operationsSegments[0].id },
            },
          },
        },
        where: { id: props.routing.id },
      },
    },
  },
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_OPERATION,
})(RoutingThroughput)));
