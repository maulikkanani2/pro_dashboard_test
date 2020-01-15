import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    borderBottom: '1px solid #c4c4c4',
    padding: theme.spacing.unit * 3,
    height: 100,
    minHeight: 100,
  }, 
});

const Header = (props) => (
  <Box className={props.classes.root} alignItems="center" justifyContent="space-between">
    {props.children}
  </Box>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Header);
