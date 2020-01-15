import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 46,
    width: 46,
    marginRight: theme.spacing.unit * 2,
  }, 
});

const Img = (props) => (
  <img alt="cardImg" src={props.src} className={props.classes.root} />
)

Img.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
}

export default withStyles(styles)(Img);
