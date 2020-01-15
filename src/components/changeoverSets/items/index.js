import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_CHANGEOVER_SET } from '../../../graphql/mutations/changeoverSets';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import ChangeoverSetItemForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const ChangeoverSetItem = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<ChangeoverSetItemForm
      changeoverSetItem={props.changeoverSetItem}
      changeoverSet={props.changeoverSet}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.changeoverSetItem.fromValue.value} -> {props.changeoverSetItem.toValue.value} -> {props.changeoverSetItem.time}</Typography>
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
    changeoverSetItems: {
      delete: { id: props.changeoverSetItem.id },
    }
  },
  where: { id: props.changeoverSet.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_CHANGEOVER_SET,
})(ChangeoverSetItem)));
