import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {MyContext} from 'App';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';

import { Facebook as FacebookIcon } from 'icons';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleSignIn = event => {
    event.preventDefault();
    history.push('/');
  };
  ;

  return (
    <MyContext.Consumer>
      {(context) => (
        <div className={classes.root}>
          <Grid
            className={classes.grid}
            container
          >
            <Grid
              className={classes.quoteContainer}
              item
              lg={5}
            >
              <div className={classes.quote}>
                <div className={classes.quoteInner}>
                  <Typography
                    className={classes.quoteText}
                    variant="h1"
                  >
                get ready... Dan 30's Birthday camping is coming!
                  </Typography>

                </div>
              </div>
            </Grid>
            <Grid
              className={classes.content}
              item
              lg={7}
              xs={12}
            >
              <div className={classes.content}>
                <div className={classes.contentHeader} />
                <div className={classes.contentBody}>
                  <form
                    className={classes.form}
                    onSubmit={handleSignIn}
                  >
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                  Sign in
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                    >
                  Sign in with social media
                    </Typography>
                    <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={context.loginFunction}
                          size="large"
                          style={{visibility: (context.currentlylogginin ? 'hidden' : 'visible')}}
                          variant="contained"
                        >
                          <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook { (context.logginfailed ? 'Loggin failed' : '')}
                        </Button>
                        <CircularProgress
                          className={classes.progress}
                          style={{visibility: (!context.currentlylogginin ? 'hidden' : 'visible')}}
                          value={progress}
                          variant="determinate"
                        />
                      </Grid>


                    </Grid>

                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </MyContext.Consumer>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
