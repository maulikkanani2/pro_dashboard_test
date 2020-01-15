import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import PersonnelPositionForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const PersonnelPosition = (props) => {
  const onDelete = () => { props.remove.execute(); }


  if (props.isEditing) {
    return (<PersonnelPositionForm
      person={props.person}
      personnelPosition={props.personnelPosition}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.personnelPosition.externalId}</Typography>
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
    personnelPosition: {
      disconnect: { id: props.personnelPosition.id },
    }
  },
  where: { id: props.person.id }
})

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_PERSON,
})(PersonnelPosition)));
