import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import VBox from '../layout/VBox';
import Box from '../layout/Box';
import Resizer from './resizer';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  nav: {
    height: '100%',
    width: 230,
    minWidth: 230,
    backgroundColor: '#fff',
    borderRight: '1px solid #c4c4c4',
    position: 'relative',
  },
  navInner: {
    height: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  navRouteActive: {
    backgroundColor: 'rgba(0, 119, 255, 0.1)',
  },
  navRouteText: {
    opacity: 0.9,
    fontWeight: 500,
    marginLeft: theme.spacing.unit * 2,
  },
  navRouteTextActive: {
    color: theme.palette.primary.main,
  },
  scenarioName: {
    color: '#000',
    lineHeight: '48px',
    fontSize: '0.9em',
    opacity: '0.85',
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
});

const routes = [
  {
    name: 'Schedule',
    link: 'schedule',
    icon: 'line_style',
  },
  {
    name: 'Availability',
    link: 'availability',
    icon: 'calendar_today',
  },
  {
    name: 'Locations',
    link: 'locations',
    icon: 'place',
  },
  {
    name: 'Orders',
    link: 'orders',
    icon: 'swap_calls',
  },
  {
    name: 'Equipment',
    link: 'equipment',
    icon: 'repeat',
  },
  {
    name: 'Personnel',
    link: 'personnel',
    icon: 'person',
  },
  {
    name: 'Materials',
    link: 'materials',
    icon: 'category',
  },
  {
    name: 'Operations',
    link: 'operations',
    icon: 'group_work',
  },
  {
    name: 'Optimisation',
    link: 'optimisation',
    icon: 'home',
  },
  {
    name: 'Imports',
    link: 'import',
    icon: 'input',
  },
];

class ScenarioNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideToggle: true,
    };

    this.handleSideToggle = this.handleSideToggle.bind(this);
  }

  onClick(link) {
    return () => {
      this.props.history.push(link);
    };
  }

  handleSideToggle() {
    this.setState({ sideToggle: !this.state.sideToggle });
  }

  render() {
    const { classes, location, scenario } = this.props;
    let { sideToggle } = this.state;
    const splitLocation = location.pathname.split('/');
    const className = classnames(classes.nav, { sidemenu_Hide: !sideToggle });

    return (
      <VBox className={className} id="sideMenu">
        <VBox fit className={classes.navInner}>
          <Box center className={classes.scenarioNameWrapper}>
            <Typography className={classes.scenarioName} variant="subheading">
              {sideToggle ? scenario.name : ''}
            </Typography>
          </Box>
          <MenuList className={classes.list} component="nav">
            {routes.map(route => {
              const textClassName = classnames(classes.navRouteText, {
                [classes.navRouteTextActive]:
                  splitLocation.indexOf(route.link) > -1,
              });
              const itemClassName = classnames({
                [classes.navRouteActive]:
                  splitLocation.indexOf(route.link) > -1,
              });
              return (
                <MenuItem
                  key={route.link}
                  className={itemClassName}
                  button
                  onClick={this.onClick(route.link)}>
                  <Tooltip title={route.name} appendToBody>
                    <i className="material-icons">{route.icon}</i>
                  </Tooltip>
                  <ListItemText
                    classes={{ primary: textClassName }}
                    primary={route.name}
                  />
                </MenuItem>
              );
            })}
          </MenuList>
        </VBox>
        <Resizer isExpanded={sideToggle} toggle={this.handleSideToggle} />
      </VBox>
    );
  }
}

export default withRouter(withStyles(styles)(ScenarioNav));
