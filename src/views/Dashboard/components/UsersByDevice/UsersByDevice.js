import React from 'react';
import { Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {MyContext} from 'App';

import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();


  const options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };


  return (
    <MyContext.Consumer>
      {(context) => (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Going statistics"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Pie
            data={{
              type: 'pie',
              datasets: [
                {
                  data: [context.GoingToTotal, context.NotGoingToTotal],
                  backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.error.main
                  ],
                  borderWidth: 8,
                  borderColor: theme.palette.white,
                  hoverBorderColor: theme.palette.white
                }
              ],
              labels: ['Going', 'Not Going']
            }}
            options={options}
          />
        </div>

      </CardContent>
    </Card>
      )}
    </MyContext.Consumer>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
