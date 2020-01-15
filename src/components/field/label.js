import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  }, 
});

const Label = (props) => (
  <Typography className={props.classes.root} variant={props.variant}>{props.label}</Typography>
)

Label.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

Label.defaultProps = {
  variant: 'subheading',
};

export default withStyles(styles)(Label);

