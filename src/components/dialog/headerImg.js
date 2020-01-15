
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '100%',
    marginRight: theme.spacing.unit * 2,
  }, 
});

const HeaderImg = (props) => (
  <img alt="headerImg" src={props.src} className={props.classes.root} />
)

HeaderImg.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
}

export default withStyles(styles)(HeaderImg);
