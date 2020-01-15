import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_PERSONNEL_CLASS } from '../../graphql/mutations/personnelClasses';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const PersonnelClassExternalId = (props) => {
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
  externalId: props.personnelClass.externalId,
});

const mapPropsToVariables = props => {
  return {
    where: { id: props.personnelClass.id },
    data: {
      externalId: props.getFormValues().externalId
    }
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A personnel class code must be filled in!'
}];

PersonnelClassExternalId.propTypes = {
  personnelClass: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

PersonnelClassExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_PERSONNEL_CLASS,
    propName: 'update',
    validations,
  })(PersonnelClassExternalId)));
