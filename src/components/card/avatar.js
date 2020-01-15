import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit * 2,
  },
});

const AvatarWrapper = (props) => {
  if (props.tooltip) {
    return (
      <Tooltip title={props.tooltip} appendToBody>
        <Avatar className={props.classes.root}>{props.children}</Avatar>
      </Tooltip>
    )
  } else {
    return (
      <Avatar className={props.classes.root}>{props.children}</Avatar>
    )
  }
}

AvatarWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tooltip: PropTypes.node,
}

AvatarWrapper.defaultProps = {
  children: [],
  tooltip: null,
};

export default withStyles(styles)(AvatarWrapper);

