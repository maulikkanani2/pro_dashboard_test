import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { DateTimePicker } from 'material-ui-pickers';

import { DATE_TIME_FORMAT } from '../../constants';

const EditableDateTime = (props) => {
  const renderText = () => {
    return (
      <Typography
        onClick={props.onClick}
        className={props.classes.text}
        variant={props.variant}>
        {props.date ? format(props.date, props.format) : props.blankText}
      </Typography>
    )
  }

  return (
    <Fragment>
      { !props.editing && renderText()  }
      { props.editing && <DateTimePicker
        InputProps={{ classes: props.classes.date }}
        value={props.date}
        format={props.format}
        onChange={props.onChange} />
      }
    </Fragment>
  )
}

EditableDateTime.propTypes = {
  editing: PropTypes.bool.isRequired,
  blankText: PropTypes.string,
  format: PropTypes.string,
  variant: PropTypes.string,
  date: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes: PropTypes.object,
};

EditableDateTime.defaultProps = {
  format: DATE_TIME_FORMAT,
  variant: 'body1',
  onChange: () => {},
  classes: {},
  onClick: () => {},
  blankText: 'Click to add a Date Time',
};

export default EditableDateTime;
