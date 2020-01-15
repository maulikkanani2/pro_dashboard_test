import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import VBox from '../layout/VBox';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  }, 
});

const AddBody = (props) => (
  <VBox className={props.classes.root}>
    {props.children}
  </VBox>
)

AddBody.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(AddBody);

