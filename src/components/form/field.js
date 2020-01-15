import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  }, 
});

const AddField = (props) => (
  <Box className={props.classes.root}>
    {props.children}
  </Box>
)

AddField.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(AddField);

