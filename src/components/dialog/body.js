import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 'calc(100% - 100px)',
    maxHeight: 'calc(100% - 100px)',
    overflowY: 'auto',
  }, 
});

const Body = (props) => (
  <Box className={props.classes.root} justifyContent="space-between">
    {props.children}
  </Box>
)

Body.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Body);
