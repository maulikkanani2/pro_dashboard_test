import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem'
  }
});

const Title = (props) => (
  <Box className={props.classes.root}>
    <Typography className={props.classes.title} variant="display1">{props.title}</Typography>
  </Box>
);

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Title);
