import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ScenarioIcon from '@material-ui/icons/Tab';
import AnalyticsIcon from '@material-ui/icons/Dashboard';
import UsersIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import logo from '../../assets/img/logo-white.svg';
import VBox from '../layout/VBox';
import Box from '../layout/Box';
import UserMenu from './userMenu';

const styles = theme => ({
  navButton: {
    color: '#aaa',
    fontSize: '0.7rem',
    '&:hover': {
      color: 'white'
    }
  },
  navButtonActive: {
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  },
  nav: {
    width: 80,
    minWidth: 80,
    backgroundColor: '#354052',
  },
  navInner: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  logo: {
    height: 64,
    width: 64
  },
  logoWrapper: {
    marginBottom: theme.spacing.unit * 2
  }
});

const routes = [{
  icon: <ScenarioIcon />,
  link: 'scenarios'
}, {
  icon: <AnalyticsIcon />,
  link: 'analytics'
}, {
  icon: <UsersIcon />,
  link: 'users'
}];

const Navigation = ({ classes, location, history }) => {
  const handleClick = (link) => {
    return () => {
      history.push(`/${link}`);
    };
  };

  const splitLocations = location.pathname.split('/');
  const isActive = (link) => splitLocations.indexOf(link) > -1;

  return (
    <VBox className={classes.nav}>
      <VBox fit className={classes.navInner} alignItems="center" justifyContent="space-between">
        <Box className={classes.logoWrapper}>
          <img src={logo} alt="Ailytic" className={classes.logo} />
        </Box>
        <VBox flex="1">
          {routes.map((route) => {
            const className = classnames(classes.navButton, { [classes.navButtonActive]: isActive(route.link) });

            return <IconButton
              key={route.link}
              onClick={handleClick(route.link)}
              className={className}
              size="small">
              {route.icon}
            </IconButton>;
          })}
        </VBox>
        <VBox flex="1" justifyContent="flex-end">
          <IconButton
            onClick={handleClick('about')}
            className={classnames(classes.navButton, { [classes.navButtonActive]: isActive('about') })}
            size="small">
            <InfoIcon />
          </IconButton>
          <UserMenu classes={{ button: classes.navButton }} />
        </VBox>
      </VBox>
    </VBox>
  );
};

export default withRouter(withStyles(styles)(Navigation));
