import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export { default as FormBody } from './body';
export { default as FormButtons } from './buttons' 
export { default as FormField } from './field' 
export { default as FormToggle } from './toggle' 

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit,
    border: '1px solid #c4c4c4',
    background: '#fff',
  }, 
});

const Form = (props) => (
  <div className={props.classes.root}>
    {props.children}
  </div>
)

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Form);
