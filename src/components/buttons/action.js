import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
  root: {
    color: '#c4c4c4',
    width: 24,
    height: 24,
  },
  pointer: {
    cursor: 'pointer',
  },
})

const ActionButton = (props) => {
  const className = classnames(props.classes.root, { [props.classes.pointer]: props.pointer });

  return (
    <IconButton className={className} onClick={props.onClick}>
      {props.children}
    </IconButton>
  )
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  pointer: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

ActionButton.defaultProps = {
  pointer: true,
  onClick: () => {},
};

export default withStyles(styles)(ActionButton);
