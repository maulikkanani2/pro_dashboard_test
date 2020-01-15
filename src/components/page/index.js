import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import VBox from '../layout/VBox';
export { default as PageTitle } from './title';
export { default as PageActions } from './actions';
export { default as PageBody } from './body';
export { default as PageTabs } from './tabs';
export { default as PageTab } from './tab';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 4,
    background: 'rgb(250,251,252)',
    zIndex: 0,
  },
});

const Page = (props) => (
  <VBox fit alignItems="center" className={props.classes.root}>
    {props.children}
  </VBox>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Page);
