import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from 'material-ui-pickers';

import { TIME_FORMAT } from '../../constants';

const EditableTime = (props) => {
  const renderText = () => {
    return (
      <Typography
        onClick={props.onClick}
        className={props.classes.text}
        variant={props.variant}>
        {props.time ? format(props.time, props.format) : props.blankText}
      </Typography>
    )
  }

  return (
    <Fragment>
      {!props.editing && renderText()}
      {props.editing && <TimePicker
        InputProps={{ classes: props.classes.date }}
        value={props.time}
        format={props.format}
        onChange={props.onChange} />
      }
    </Fragment>
  )
}

EditableTime.propTypes = {
  editing: PropTypes.bool.isRequired,
  blankText: PropTypes.string,
  format: PropTypes.string,
  variant: PropTypes.string,
  time: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes: PropTypes.object,
};

EditableTime.defaultProps = {
  format: TIME_FORMAT,
  variant: 'body1',
  onChange: () => { },
  classes: {},
  onClick: () => { },
  blankText: 'Click to add a Time',
};

export default EditableTime;
