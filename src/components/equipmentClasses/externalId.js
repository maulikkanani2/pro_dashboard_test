import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_EQUIPMENT_CLASS } from '../../graphql/mutations/equipmentClasses';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const EquipmentClassExternalId = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.externalId}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('externalId', eventToValue)}
  />);
}

const mapPropsToFields = props => ({
  externalId: props.equipmentClass.externalId,
});

const mapPropsToVariables = props => {
  return {
    where: { id: props.equipmentClass.id },
    data: {
      externalId: props.getFormValues().externalId
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A equipment class code must be filled in!'
}];

EquipmentClassExternalId.propTypes = {
  personnelClass: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

EquipmentClassExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_EQUIPMENT_CLASS,
    propName: 'update',
    validations,
  })(EquipmentClassExternalId)));
