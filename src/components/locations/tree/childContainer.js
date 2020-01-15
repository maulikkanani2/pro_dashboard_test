import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import VBox from '../../layout/VBox';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 4,
  },
  rootContainer: {
    marginLeft: 0,
  },
});

const ChildContainer = (props) => {
  const rootClassName = classnames(props.classes.root, { [props.classes.rootContainer]: props.isRoot });

  return (
    <VBox className={rootClassName}>
      {props.children}
    </VBox>
  )
}

export default withStyles(styles)(ChildContainer);
