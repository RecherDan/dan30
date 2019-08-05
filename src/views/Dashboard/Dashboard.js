import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import {
  Budget,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice
} from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <Budget />

        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Hidden only={['sm', 'xs']}>
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        </Hidden>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <TasksProgress />

        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
