import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_CHANGEOVER_SET } from '../../graphql/mutations/changeoverSets';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const ChangeoverSetName = (props) => {
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
  name: props.changeoverSet.name,
});

const mapPropsToVariables = props => ({
  where: { id: props.changeoverSet.id },
  data: { name: props.getFormValues().name },
});

const validations = [{
  function: (variables, props) => { return !!(props.getFormValues().name) },
  message: 'A name must be filled in!'
}];

ChangeoverSetName.propTypes = {
  changeoverSet: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ChangeoverSetName.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(
  withMutation(mapPropsToVariables, {
    mutation: UPDATE_CHANGEOVER_SET,
    propName: 'update',
    validations,
  })(ChangeoverSetName)));
