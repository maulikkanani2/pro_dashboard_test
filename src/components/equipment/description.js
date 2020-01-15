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
    wordBreak: 'break-all'
  }
};

let EquipmentDescription = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.description}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('description', eventToValue)}
  />);
};

const mapPropsToFields = props => ({
  description: props.equipment.description,
});

const mapPropsToVariables = props => ({
  where: { id: props.equipment.id },
  data: { description: props.getFormValues().description },
});

EquipmentDescription.propTypes = {
  equipment: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

EquipmentDescription.defaultProps = {
  classes: {},
  variant: 'body1',
};
EquipmentDescription = withStyles(styles)(EquipmentDescription);
export default withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: UPDATE_EQUIPMENT,
  propName: 'update',
})(EquipmentDescription)));
