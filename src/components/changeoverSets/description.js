import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../fields/editableText';
import { UPDATE_CHANGEOVER_SET } from '../../graphql/mutations/changeoverSets';
import withForm from '../../wrappers/form';
import { eventToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withEditing from '../../wrappers/edit';

const ChangeoverSetDescription = (props) => {
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
  description: props.changeoverSet.description,
});

const mapPropsToVariables = props => ({
  where: { id: props.changeoverSet.id },
  data: { description: props.getFormValues().description },
});

ChangeoverSetDescription.propTypes = {
  changeoverSet: PropTypes.object.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

ChangeoverSetDescription.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToVariables, {
  mutation: UPDATE_CHANGEOVER_SET,
  propName: 'update',
})(ChangeoverSetDescription)));
