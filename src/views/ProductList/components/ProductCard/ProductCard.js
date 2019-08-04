import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {findArrayElementByTitle, MyContext} from 'App';
import {ListItem, ListItemAvatar, List, Avatar,ListItemText} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AirlineSeat from '@material-ui/icons/AirlineSeatReclineExtra';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = props => {
  const { className, car, ...rest } = props;

  const classes = useStyles();

  return (
    <MyContext.Consumer>
      {(context) => (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          { console.log(findArrayElementByTitle(context.comes,car.driverid)) }
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="Product"
                className={classes.image}
                src={findArrayElementByTitle(context.comes,car.driverid).img}
              />
            </div>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
            >
              {findArrayElementByTitle(context.comes,car.driverid).name}
            </Typography>

            <List
              className={classes.root}
              dense
            >

              {
                car.userslist.map(usr => {
                  let usrobj = findArrayElementByTitle(context.comes, usr);
                  if ( usrobj !==undefined ) {
                    return (
                      <ListItem
                        button
                        key={usr}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={'{usr}'}
                            src={usrobj.img}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          id={usr}
                          primary={usrobj.name}
                        />
                      </ListItem>
                    )
                  }
                })
              }
            </List>

          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              container
              justify="space-between"
            >
              <Grid
                className={classes.statsItem}
                item
              >

                <Button
                  className={classes.button}
                  color="primary"
                  onClick={() => { context.joincarFunction(car.id,(car.inthiscar? false : true))}}
                  size="small"
                  style={{ visibility: ((!context.incar )|| car.inthiscar ) ? 'visible' : 'hidden'}}
                  variant="contained"
                >
                  {car.inthiscar? 'Exit' : 'Join'}
                </Button>
              </Grid>
              <Grid
                className={classes.statsItem}
                item
              >
                <AirlineSeat className={classes.statsIcon} />
                <Typography
                  display="inline"
                  variant="body2"
                >
                  {car.amount - car.exists} seats left
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
    </MyContext.Consumer>
  );
};

ProductCard.propTypes = {
  car: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default ProductCard;
