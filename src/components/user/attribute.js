import React from 'react';

import EditableText from '../fields/editableText';
import withForm from '../../wrappers/form';
import withEditting from '../../wrappers/edit';
import {eventToValue} from '../../utils/fieldValueMapping';

const AttributeField = props => {
  const onSave = () => {
    const data = {
      attributes: props.formValues,
      username: props.user.Username,
    };
    props.onUpdate (data).then (data => {
      props.toggleEditing (false) ();
      props.onReload ();
    });
  };

  return (
    <EditableText
      classes={props.classes}
      editing={props.isEditing}
      text={props.formValues[props.attribute]}
      variant={props.variant}
      onClick={props.toggleEditing (true)}
      onChange={props.onFieldChange (props.attribute, eventToValue)}
      isSize={true}
      onSave={onSave}
    />
  );
};

const mapStateToProps = props => ({
  [props.attribute]: props.value,
});

export default withEditting (withForm (mapStateToProps) (AttributeField));
