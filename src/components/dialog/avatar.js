import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit * 2,
  }, 
});

const AvatarWrapper = (props) => (
  <Avatar className={props.classes.root}>{props.children}</Avatar>
)

AvatarWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
}

AvatarWrapper.defaultProps = {
  children: []
};

export default withStyles(styles)(AvatarWrapper);


