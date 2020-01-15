import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const EditableText = (props) => {
  const catchReturn = (e) => {
    if (e.key === 'Enter') {
      props.onSave();
    }
  }

  const renderText = () => {
    return (
      <Tooltip title="Click to edit">
        <Typography
          onClick={props.onClick}
          className={props.classes.text}
          variant={props.variant}>
          {Boolean(props.text) ? props.text : props.blankText}
        </Typography>
      </Tooltip>
    )
  }

  const inputProps = () => {
    if (props.isResize)
      return (props.text && props.text.length) || 0;
  }

  return (
    <Fragment>
      {!props.editing && renderText()}
      {props.editing && <TextField
        inputProps={{ size: inputProps(), className: props.classes.input }}
        onKeyPress={catchReturn}
        value={props.text}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onSave} />
      }
    </Fragment>
  )
}

EditableText.propTypes = {
  editing: PropTypes.bool.isRequired,
  blankText: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  classes: PropTypes.object,
  type: PropTypes.string,
};

EditableText.defaultProps = {
  blankText: 'Click to add Text',
  variant: 'body1',
  type: 'text',
  onClick: () => { },
  onChange: () => { },
  onSave: () => { },
  classes: {},
};

export default EditableText;
