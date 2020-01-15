import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  }
})

const PageTabs = ({ children, ...props }) => {
  return <Tabs className={props.classes.root} {...props}>{children}</Tabs>
};

export default withStyles(styles)(PageTabs);