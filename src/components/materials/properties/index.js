import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import CrossIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';

import { UPDATE_MATERIAL } from '../../../graphql/mutations/materials';

import MaterialPropertyForm from './form';
import Field, { FieldControl, FieldIcon } from '../../field';
import Box from '../../layout/Box';
import { withDelete, withEditing, withHover } from '../../../wrappers';

const MaterialProperty = (props) => {
  const { material, materialProperty, remove, isEditing, toggleEditing, isHovered, toggleHovered } = props

  if (isEditing) {
    return <MaterialPropertyForm materialProperty={materialProperty} material={material} onCancel={toggleEditing(false)} />
  }

  return (
    <FieldControl onMouseEnter={toggleHovered(true)} onMouseLeave={toggleHovered(false)}>
      <Field>
        <Typography>{materialProperty.externalId} : {materialProperty.value}</Typography>
        {
          isHovered && <Box flex="1 0 auto" justifyContent="flex-end">
            <FieldIcon><EditIcon onClick={props.toggleEditing(true)} /></FieldIcon>
            <FieldIcon><CrossIcon onClick={remove} /></FieldIcon>
          </Box>
        }
      </Field>
    </FieldControl>
  )
}

MaterialProperty.propTypes = {
  material: PropTypes.object.required,
  materialProperty: PropTypes.object
}

const mapPropsToDeleteVariables = props => ({
  data: {
    materialProperties : {
      delete : {
        id : props.materialProperty.id
      }
    }
  },
  where: { id: props.material.id }
});

export default withHover(withEditing(withDelete(mapPropsToDeleteVariables, {
  mutation: UPDATE_MATERIAL,
})(MaterialProperty)));
