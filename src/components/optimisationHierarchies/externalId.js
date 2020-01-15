import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_OPTIMISATION_HIERARCHY } from '../../graphql/mutations/optimisationHierarchies';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const OptimisationHierarchyExternalId = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.externalId}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('externalId', eventToValue)}
  />);
};

const mapPropsToFields = props => ({
  externalId: props.optimisationHierarchy.externalId,
});

const mapPropsToVariables = props => ({
  where: { id: props.optimisationHierarchy.id },
  data: { externalId: props.getFormValues().externalId },
});

OptimisationHierarchyExternalId.propTypes = {
  optimisationHierarchy: PropTypes.object.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OptimisationHierarchyExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: UPDATE_OPTIMISATION_HIERARCHY,
  propName: 'update',
})(OptimisationHierarchyExternalId)));
