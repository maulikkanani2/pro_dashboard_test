import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Close';

import withHover from '../../wrappers/hover';
import ActionButton from '../buttons/action';

const Search = (props) => {
  const renderActive = () => {
    let inputProps = {
      startAdornment: <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>,
    }

    if (props.value) {
      inputProps = {
        ...inputProps,
        endAdornment: <InputAdornment position="end">
          <ClearIcon onClick={props.onClear} />
        </InputAdornment>
      }
    }

    return (
      <TextField
        value={props.value}
        onChange={props.onChange}
        InputProps={inputProps} />
    )
  }

  return (
    <div onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      {(props.isHovered || props.value) && renderActive()}
      {(!props.isHovered && !props.value) && <ActionButton><SearchIcon /></ActionButton>}
    </div>
  )
}

export default withHover(Search);
