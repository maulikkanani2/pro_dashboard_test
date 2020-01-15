import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const EditableSelect = (props) => {
  const renderText = () => {
    return (
      <Typography
        onClick={props.onClick}
        className={props.classes.text}
        variant={props.variant}>
        {props.selected ? props.selected[props.displayField] : props.blankText}
      </Typography>
    )
  }

  const renderSelect = () => {
    return (
      <Select classes={props.classes.select} value={props.selected ? props.selected[props.valueField] : ''} onChange={props.onSelect}>
        {props.options.map((option) =>
          <MenuItem
            key={option[props.valueField]}
            value={option[props.valueField]}>
            {option[props.displayField]}
          </MenuItem>
        )}
      </Select>
    )
  }

  return (
    <Fragment>
      {!props.editing && renderText()}
      {props.editing && renderSelect()}
    </Fragment>
  )
}

EditableSelect.propTypes = {
  editing: PropTypes.bool.isRequired,
  blankText: PropTypes.string,
  variant: PropTypes.string,
  selected: PropTypes.any,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  options: PropTypes.array,
  classes: PropTypes.object,
  displayField: PropTypes.string,
  valueField: PropTypes.string,
};

EditableSelect.defaultProps = {
  variant: 'body1',
  onChange: () => { },
  classes: {},
  onClick: () => { },
  blankText: 'Click to Select',
  displayField: 'name',
  valueField: 'id',
};

export default EditableSelect;
