import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import WorkIcon from '@material-ui/icons/Work';
import ExitToAppIcon from '@material-ui/icons/LockOpen';
import {MyContext} from 'App';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'CarPool',
      href: '/carpool',
      icon: <LocalTaxiIcon />
    },/*
    {
      title: 'Menu',
      href: '/menu',
      icon: <ShoppingBasketIcon />
    },*/
    {
      title: 'Items',
      href: '/items',
      icon: <WorkIcon />
    },
    /* {
       title: 'Typography',
       href: '/typography',
       icon: <TextFieldsIcon />
     },
     {
       title: 'Icons',
       href: '/icons',
       icon: <ImageIcon />
     },
     {
       title: 'Account',
       href: '/account',
       icon: <AccountBoxIcon />
     },
     {
       title: 'Settings',
       href: '/settings',
       icon: <SettingsIcon />
     },*/
    {
      title: 'Log Out',
      href: '/logout',
      icon: <ExitToAppIcon />
    }
  ];

  return (
    <MyContext.Consumer>
      {(context) => (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
          variant={variant}
          onClose={onClose}
        />
      </div>
    </Drawer>
      )}
    </MyContext.Consumer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
