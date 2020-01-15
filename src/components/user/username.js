import React from "react";

import EditableText from '../fields/editableText';
import withForm from '../../wrappers/form';

const UserUsername = (props) => {
    return (
        <EditableText
            classes={props.classes}
            editing={false}
            text={props.user.Username}
            variant={props.variant}
        />
    );
}

export default withForm(UserUsername)(UserUsername);