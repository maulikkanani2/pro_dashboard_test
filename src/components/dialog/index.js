import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import VBox from '../layout/VBox';
import Box from '../layout/Box';
export { default as DialogHeader } from './header';
export { default as DialogHeaderImg } from './headerImg';
export { default as DialogBody } from './body';
export { default as DialogColumn } from './column';
export { default as DialogAvatar } from './avatar';

const styles = theme => ({
  root: {
    maxHeight: 750,
    width: 1050,
    maxWidth: 1050,
    overflowY: 'visible',
  },
});

const DialogWrapper = (props) => (
  <Dialog
    open={props.open}
    onClose={props.onClose}
    classes={{ paper: props.classes.root }}>
    {props.isLoading && <Box center fit><CircularProgress /></Box>}
    {!props.isLoading && <VBox fit>{props.children}</VBox>}
  </Dialog>
)

DialogWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

DialogWrapper.defaultProps = {
  isLoading: false,
};

export default withStyles(styles)(DialogWrapper);
