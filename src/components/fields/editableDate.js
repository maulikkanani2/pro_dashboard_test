import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from 'material-ui-pickers';

import { DATE_FORMAT } from '../../constants';

const EditableDate = (props) => {
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
      { props.editing && <DatePicker
        InputProps={{ classes: props.classes.date }}
        value={props.date}
        format={props.format}
        onChange={props.onChange} />
      }
    </Fragment>
  )
}

EditableDate.propTypes = {
  editing: PropTypes.bool.isRequired,
  blankText: PropTypes.string,
  format: PropTypes.string,
  variant: PropTypes.string,
  date: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes: PropTypes.object,
};

EditableDate.defaultProps = {
  format: DATE_FORMAT,
  variant: 'body1',
  onChange: () => {},
  classes: {},
  onClick: () => {},
  blankText: 'Click to add a Date',
};

export default EditableDate;
