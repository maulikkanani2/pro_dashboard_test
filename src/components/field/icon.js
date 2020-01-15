
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    color: '#c4c4c4',
  }, 
});

const IconWrapper = (props) => (
  <Icon className={props.classes.root}>{props.children}</Icon>
)

IconWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(IconWrapper);

