import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import {MyContext} from 'App';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  return (
    <MyContext.Consumer>
      {(context) => (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={ context.user ? context.user.photoURL : "USERNAME"}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        { context.user ? context.user.displayName : "USERNAME"}
      </Typography>
      <Typography variant="body2">{ context.isAdmin ? "Admin" : "Normal user" }</Typography>
      {console.log("Admin Mode: " + context.AdminMode + " IsAdmin: " + context.isAdmin)}
      {context.isAdmin ?
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={context.AdminMode}
                onChange={context.changeAdminModeFunction}
                value="checkedB"
                color="primary"
              />
            }
            label="Admin Mode"
          />
        </FormGroup>
        :
        <div>

        </div>
      }
    </div>
      )}
    </MyContext.Consumer>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
