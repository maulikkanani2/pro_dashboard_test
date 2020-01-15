import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';
import Icon from '@material-ui/core/Icon';
import classnames from 'classnames';

import VBox from '../layout/VBox';
import withHover from '../../wrappers/hover';

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: 16,
    right: -16,
    zIndex: 1000,
    '&:before': {
      content: '""',
      transition: 'background-color 300ms ease-in-out 200ms',
      height: '100%',
      left: -1,
      position: 'absolute',
      width: 2,
    },
  },
  rootHovered: {
    '&:before': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  arrow: {
    opacity: 0,
    transition: 'opacity 200ms ease-in-out 200ms',
    color: theme.palette.primary.main,
    zIndex: 1000,
  },
  arrowHovered: {
    opacity: 1,
  }
});

const NavResizer = (props) => {
  const rootClassName = classnames(props.classes.root, { [props.classes.rootHovered]: props.isHovered });
  const arrowClassName = classnames(props.classes.arrow, { [props.classes.arrowHovered]: props.isHovered });
  const toggle = () => {
    props.toggleHovered(!props.isHovered)();
    props.toggle();
  }

  return (
    <VBox center className={rootClassName} onMouseEnter={props.toggleHovered(true)} onMouseLeave={props.toggleHovered(false)}>
      <Icon onClick={toggle} className={arrowClassName}>{props.isExpanded ? <LeftArrow /> : <RightArrow />}</Icon>
    </VBox>
  )
};

export default withStyles(styles)(withHover(NavResizer));