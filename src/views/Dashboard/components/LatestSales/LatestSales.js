import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {MyContext} from 'App';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/FilledInput';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: 3,
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <MyContext.Consumer>
      {(context) => (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Going"
      />
      <Divider />
      <CardContent>
        <div className='flex-container'>
          {context.comes.map((usr,i) => {
            if ( usr.going ) {
              return (
                <Chip
                  avatar={<Avatar src={usr.img}>MB</Avatar>}
                  label={usr.name}
                  className={classes.chip}
                  color="primary"
                  key={usr.id}
                />
              )
            }
            else {
              return (null);
            }
})}
        </div>

      </CardContent>
      <Divider />
      <CardHeader
        title="Not Going"
      />
      <CardContent>
        <div className='flex-container'>

          {context.comes.map(usr => {

            if ( !usr.going ) {
            return (
              <Chip
                avatar={<Avatar src={usr.img}>MB</Avatar>}
                label={usr.name}
                className={classes.chip}
                color="default"
                key={usr.id}
              />
            )}
            else {
              return (null);
            }
          })}
        </div>

      </CardContent>
      <Divider />

      <CardActions className={classes.actions}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-simple">Going</InputLabel>
          <Select
            value={context.isgoingselect}
            onChange={context.isGoingFunction}
            input={<OutlinedInput name="age" id="filled-age-simple" />}
          >
            <MenuItem value={10}>Going</MenuItem>
            <MenuItem value={20}>Not Going</MenuItem>
          </Select>
        </FormControl>

      </CardActions>
    </Card>
        )}
        </MyContext.Consumer>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
