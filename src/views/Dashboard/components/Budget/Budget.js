import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/TodayRounded';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
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
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Budget = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >

          <Grid item>
            <Avatar className={classes.avatar}>
              <TodayIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
              align="right"
            >
              תיאור
            </Typography>
            <Typography variant="h4" align="right" style={{ textalign: 'right' }}>!הקמפינג השנתי - הפעם בסימן יום הולדת 30</Typography>
            <Divider />
            <Typography variant="h4" align="right" style={{ textalign: 'right' }}>6-7.9 : תאריך</Typography>
            <Typography variant="h4" align="right" style={{ textalign: 'right' }}> מיקום: גשר הפקק -  <Link href="https://www.waze.com/ul?ll=33.04045260%2C35.62938730&navigate=yes"> קישור לווייז</Link></Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
