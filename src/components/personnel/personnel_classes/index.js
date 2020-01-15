import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import withDelete from '../../../wrappers/delete';
import withHover from '../../../wrappers/hover';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const PersonnelClass = (props) => {
  const onDelete = () => { props.remove.execute(); }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.personnelClass.externalId}</Typography>
        {
          props.isHovered && <Box flex="1 0 auto" justifyContent="flex-end">
            <FieldIcon><CrossIcon onClick={onDelete} /></FieldIcon>
          </Box>
        }
      </Field>
    </FieldControl>
  )
}

const mapPropsToDeleteVariables = props => ({
  data: {
    personnelClasses: {
      disconnect: { id: props.personnelClass.id },
    }
  },
  where: { id: props.person.id }
})

export default withHover(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_PERSON,
})(PersonnelClass));
