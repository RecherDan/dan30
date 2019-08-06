import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  UsersTable } from './components';
import {MyContext} from 'App';
import {Grid} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();


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
