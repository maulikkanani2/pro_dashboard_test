import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import classnames from 'classnames';

import Box from '../layout/Box';
import withHover from '../../wrappers/hover';
export { default as CardImg } from './img';
export { default as CardChip } from './chip';
export { default as CardAvatar } from './avatar';

const styles = theme => ({
  root: {
    height: 80,
    minHeight: 80,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    boxShadow: 'none',
    border: '1px solid #c4c4c4',
  },
  hover: {
    border: 'none',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
  },
});

const Card = (props) => {
  const className = classnames(props.classes.root, { [props.classes.hover]: props.isHovered });

  return (
    <Paper className={className} onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Box>
        {props.children}
      </Box>
    </Paper>
  );
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withHover(withStyles(styles)(Card));
