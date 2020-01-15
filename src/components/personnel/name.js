import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_PERSON } from '../../graphql/mutations/personnel';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const PersonName = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  }

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.name}
    variant={props.variant}
    onSave={onSave}
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('name', eventToValue)}
  />);
}

const mapPropsToFields = props => ({
  name: props.person.name,
});

const mapPropsToVariables = props => ({
  where: { id: props.person.id },
  data: { name: props.getFormValues().name },
});

PersonName.propTypes = {
  person: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

PersonName.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, { 
    mutation: UPDATE_PERSON,
    propName: 'update',
  })(PersonName)));
