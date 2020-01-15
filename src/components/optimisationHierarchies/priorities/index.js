import React from 'react';
import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_OPTIMISATION_HIERARCHY } from '../../../graphql/mutations/optimisationHierarchies';
import withDelete from '../../../wrappers/delete';
import withEditing from '../../../wrappers/edit';
import withHover from '../../../wrappers/hover';
import OptimisationHierarchyPriorityForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';

const OptimisationHierarchyPriority = (props) => {
  const onDelete = () => { props.remove.execute(); }

  if (props.isEditing) {
    return (<OptimisationHierarchyPriorityForm
      priority={props.priority}
      optimisationHierarchy={props.optimisationHierarchy}
      onCancel={props.toggleEditing(false)} />
    );
  }

  return (
    <FieldControl onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Field>
        <Typography>{props.priority.optimisationProperty.name} -> {props.priority.priority}</Typography>
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
    optimisationHierarchyAttributes: {
      delete: { id: props.priority.id },
    }
  },
  where: { id: props.optimisationHierarchy.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_OPTIMISATION_HIERARCHY,
})(OptimisationHierarchyPriority)));
