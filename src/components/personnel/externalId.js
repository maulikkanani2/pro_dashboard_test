import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_PERSON } from '../../graphql/mutations/personnel';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const PersonExternalId = (props) => {
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
  externalId: props.person.externalId,
});

const mapPropsToVariables = props => {
  const matchingPersonnelClass = props.person.personnelClasses.find(klass => klass.externalId === props.person.externalId);

  return {
    where: { id: props.person.id },
    data: {
      externalId: props.getFormValues().externalId,
      personnelClasses: {
        update: {
          data: {
            externalId: props.getFormValues().externalId,
          },
          where: { id: matchingPersonnelClass.id }
        },
      },
    },
  }
};

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().externalId) },
  message: 'A personnel code is must be filled in!'
}];

PersonExternalId.propTypes = {
  person: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

PersonExternalId.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_PERSON,
    propName: 'update',
    validations,
  })(PersonExternalId)));
