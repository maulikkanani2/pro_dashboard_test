import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Box from '../layout/Box';

const styles = theme => ({
  root: {
    height: 48,
    maxHeight: 48,
    width: '100%',
    border: '1px dashed #c4c4c4',
  }
});

const AddToggle = (props) => {
  return (
    <Box center flex="1 0 auto" className={props.classes.root} onClick={props.onClick}>
      <Typography variant="caption">Add New</Typography>
    </Box>
  ) 
}

export default withStyles(styles)(AddToggle);
