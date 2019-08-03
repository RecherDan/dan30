import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import {MyContext} from 'App';
import {Grid, TableBody} from "@material-ui/core";
import { fade, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <MyContext.Consumer>
      {(context) => (
    <div className={classes.root}>

      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >
          {context.cats.map((cat) => {
            return (
            <Grid
              item
              lg={6}
              sm={6}
              xl={4}
              xs={12}
              key={cat.name}
            >
              <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                  {cat.name}
                </Typography>
              </div>
              <UsersTable cat={cat.name}/>
            </Grid>
            );
          })}
        </Grid>


      </div>
    </div>
      )}
    </MyContext.Consumer>
  );
};

export default UserList;
