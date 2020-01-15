import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_OPTIMISATION_PROPERTY } from '../../../graphql/mutations/optimisationProperties';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import OptimisationPropertyValueForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const OptimisationPropertyValue = (props) => {
  const onDelete = () => { props.remove.execute(); }
  const colour = props.value.colourSchemeItem;

  if (props.isEditing) {
    return (<OptimisationPropertyValueForm
      value={props.value}
      optimisationProperty={props.optimisationProperty}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography style={{ color: `rgb(${colour.red}, ${colour.green}, ${colour.blue}` }}>{props.value.value}</Typography>
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
    optimisationPropertyValues: {
      delete: { id: props.value.id },
    }
  },
  where: { id: props.optimisationProperty.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_OPTIMISATION_PROPERTY,
})(OptimisationPropertyValue)));
