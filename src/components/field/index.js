import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '../layout/Box';
export { default as FieldControl } from './control';
export { default as FieldLabel } from './label';
export { default as FieldIcon } from './icon';
 
const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    border: '1px solid #c4c4c4',
    minHeight: 42,
    overflow: 'hidden'
  }, 
});

const Field = (props) => (
  <Box center className={props.classes.root} justifyContent="space-between">
    {props.children}
  </Box>
)

Field.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Field);
