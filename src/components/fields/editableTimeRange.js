import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RightArrow from '@material-ui/icons/ArrowForward';

import EditableTime from './editableTime';

const EditableTimeRange = (props) => {
  return (
    <Fragment>        
      <EditableTime
        editing={props.editing}
        onClick={props.onClick}
        time={props.startTime}
        variant={props.variant}
        classes={props.classes}
        onSave={props.onSave}
        onChange={props.onStartChange} />
      <RightArrow className={props.classes.arrow} />
      <EditableTime
        editing={props.editing}
        onClick={props.onClick}
        time={props.endTime}
        variant={props.variant}
        onSave={props.onSave}
        classes={props.classes}
        onChange={props.onEndChange} />
    </Fragment>
  )
}

EditableTimeRange.propTypes = {
  editing: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onStartChange: PropTypes.func,
  variant: PropTypes.string,
  onEndChange: PropTypes.func,
  onSave: PropTypes.func,
  onClick: PropTypes.func,
};

EditableTimeRange.defaultProps = {
  variant: 'body1',
  classes: {},
  onSave: () => {},
  onStartChange: () => {},
  onEndChange: () => {},
  onClick: () => {},
}

export default EditableTimeRange;
