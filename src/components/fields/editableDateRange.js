import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RightArrow from '@material-ui/icons/ArrowForward';

import EditableDate from './editableDate';

const EditableDateRange = (props) => {
  return (
    <Fragment>        
      <EditableDate
        editing={props.editing}
        onClick={props.onClick}
        date={props.startDate}
        variant={props.variant}
        classes={props.classes}
        onSave={props.onSave}
        onChange={props.onStartChange} />
      <RightArrow className={props.classes.arrow} />
      <EditableDate
        editing={props.editing}
        onClick={props.onClick}
        date={props.endDate}
        variant={props.variant}
        onSave={props.onSave}
        classes={props.classes}
        onChange={props.onEndChange} />
    </Fragment>
  )
}

EditableDateRange.propTypes = {
  editing: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartChange: PropTypes.func,
  variant: PropTypes.string,
  onEndChange: PropTypes.func,
  onSave: PropTypes.func,
  onClick: PropTypes.func,
};

EditableDateRange.defaultProps = {
  variant: 'body1',
  classes: {},
  onSave: () => {},
  onStartChange: () => {},
  onEndChange: () => {},
  onClick: () => {},
}

export default EditableDateRange;
