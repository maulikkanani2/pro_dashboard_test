import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    borderTop: '1px solid #c4c4c4',
    padding: theme.spacing.unit * 2,
  }, 
});

const AddButtons = (props) => (
  <Box justifyContent="space-between" className={props.classes.root}>
    {props.children}
  </Box>
)

AddButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(AddButtons);

