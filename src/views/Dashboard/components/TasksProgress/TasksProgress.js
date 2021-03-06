import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {MyContext} from 'App';

import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/WorkRounded';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <MyContext.Consumer>
      {(context) => (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item style={{width: '70%'}}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
            >
              Items you need to bring:
            </Typography>
            <Typography variant="body1" >{context.itemsItake}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <WorkIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      )}
    </MyContext.Consumer>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
