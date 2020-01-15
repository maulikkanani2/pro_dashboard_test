import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';

import { UPDATE_EQUIPMENT } from '../../../graphql/mutations/equipment';
import withDelete from '../../../wrappers/delete';
import withHover from '../../../wrappers/hover';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const EquipmentClass = (props) => {
  const onDelete = () => { props.remove.execute(); }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography style={{ wordBreak: 'break-all' }}>{props.equipmentClass.externalId}</Typography>
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
    equipmentClasses: {
      disconnect: { id: props.equipmentClass.id },
    }
  },
  where: { id: props.equipment.id }
})

export default withHover(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_EQUIPMENT,
})(EquipmentClass));
