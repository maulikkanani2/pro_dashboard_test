import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    minHeight: 30,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

const Actions = (props) => (
  <Box alignItems="center" className={props.classes.root}>
    {props.children}
  </Box>
);

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

Actions.defaultProps = {
  children: [],
};

export default withStyles(styles)(Actions);
