import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  }, 
});

const Control = ({ classes, children, ...props }) => (
  <div className={classes.root} {...props}>
    {children}
  </div>
)

Control.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Control);
