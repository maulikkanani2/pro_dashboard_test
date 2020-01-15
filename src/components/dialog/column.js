import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  }, 
});

const Column = (props) => (
  <div style={{ width: props.width }} className={props.classes.root}>
    {props.children}
  </div>
)

Column.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default withStyles(styles)(Column);

