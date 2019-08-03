import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {MyContext} from 'App';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <MyContext.Consumer>
      {(context) => (
    <div className={classes.root}>

      <div className={classes.content}>


        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
          <p>
            you are:
          </p>
            <FormControl className={classes.formControl}>

              <Select
                value={context.isdriver ? "1" : "2"}
                onChange={context.takecarFunction}
                name="Driver"
                className={classes.selectEmpty}
              >
                <MenuItem value={1}>Driver</MenuItem>
                <MenuItem value={2}>Passenger</MenuItem>
              </Select>
            </FormControl>

          </Grid>
          {context.cars.map(car => (
            <Grid
              item
              key={car.i}
              lg={4}
              md={6}
              xs={12}
              key={car.id}
            >
              <ProductCard car={car} key={car.id}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
      )}
    </MyContext.Consumer>
  );
};

export default ProductList;
