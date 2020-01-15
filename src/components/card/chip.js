import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    color: 'rgba(0,0,0,0.52)',
    border: '1px solid rgba(0,0,0,0.52)',
    background: 'transparent',
    marginRight: theme.spacing.unit,
  },
});

const ChipWrapper = (props) => (
  <Chip className={props.classes.root} {...props} />
)

ChipWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(ChipWrapper);
