import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";

import EditableText from '../fields/editableText';
import { UPDATE_EQUIPMENT } from '../../graphql/mutations/equipment';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const styles = {
  text: {
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // width: '50%'
  }
};

let EquipmentExternalId = (props) => {
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
  externalId: props.equipment.externalId,
});

const mapPropsToVariables = props => {
  const matchingEquipmentClass = props.equipment.equipmentClasses.find(klass => klass.externalId === props.equipment.externalId);

  return {
    where: { id: props.equipment.id },
    data: {
      externalId: props.getFormValues().externalId,
      calendarisedAvailabilityTemplateSet: {
        update: {
          name: props.getFormValues().externalId,
        },
      },
      equipmentClasses: {
        update: {
          data: {
            externalId: props.getFormValues().externalId,
          },
          where: { id: matchingEquipmentClass.id }
        },
      },
    },
  };
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'An equipment code must be filled in!'
}];

EquipmentExternalId.propTypes = {
  equipment: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

EquipmentExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

EquipmentExternalId = withStyles(styles)(EquipmentExternalId);
export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_EQUIPMENT,
    propName: 'update',
    validations,
  })(EquipmentExternalId)));
