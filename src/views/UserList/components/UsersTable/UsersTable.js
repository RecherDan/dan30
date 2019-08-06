import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {findArrayElementByTitle, MyContext} from 'App';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import {fade} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    margin: theme.spacing(1),
  },
  content: {
    padding: 0
  },
  inner: {
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));
const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 10,
    width: '70px',
    padding: '5px 0px',
    margin: 'none',
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
const UsersTable = props => {
  const { className, cat, ...rest } = props;

  const classes = useStyles();


  let k=0;
  let curexist =0;
  return (
    <MyContext.Consumer>
      {(context) => (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardContent className={classes.content}>
            <div className={classes.inner}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      style={{ width: '10%' }}
                    >
                      { context.AdminMode ? 'Del' : 'Take' }
                    </TableCell>
                    <TableCell  style={{ width: '25%' }}>Item</TableCell>
                    <TableCell  style={{ width: '15%' }} >Amount</TableCell>
                    <TableCell style={{ width: '50%' }} >Who</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {context.items.map((item) => {
                    if (item.cat === cat) {
                      curexist=0;
                      return(
                        <TableRow
                          className={classes.tableRow}
                          key={item.id}
                          selected={item.taking === 'yes' ? true : false}
                        >
                          <TableCell padding="checkbox">
                            {context.AdminMode ?
                              <IconButton
                                aria-label="delete"
                                className={classes.button}
                                color="primary"
                                onClick={() => context.removeItemFunction(item.id, cat)}
                              >
                                <DeleteIcon/>
                              </IconButton>
                              :
                              <Checkbox
                                checked={item.taking === 'yes' ? true : false}
                                color="primary"
                                disabled={!context.isGoing}
                                name={item.id}
                                onChange={context.handleChangeTakeFunction}
                                value={cat}
                              />
                            }
                          </TableCell>

                          <TableCell>
                            {item.title}
                          </TableCell>
                          <TableCell>
                            {   item.usrslist.map( (usr,i) => {
                              let userobj = findArrayElementByTitle(context.comes,usr);
                              if ( i===0 ) curexist=0;
                              if ( userobj !== undefined )
                                if (userobj.going ) curexist++;
                                return (null);
                            })}
                            {curexist} / {item.amount}
                          </TableCell>
                          <TableCell>
                            {item.usrslist.map( (usr,i) => {
                              let userobj = findArrayElementByTitle(context.comes,usr);
                              if ( i === 0 ) k=0;
                              if ( userobj && userobj.going ) k++;
                              return (
                                <React.Fragment key={i}>
                                  {  ( i>0 && k > 1 && userobj && userobj.going ) ?  ', ' : '' }
                                  {  ( userobj && userobj.going ) ? userobj.name : '' }
                                </React.Fragment>
                              );
                            }
                            )}
                          </TableCell>
                        </TableRow>
                      )  }
                    else {
                      return (null);
                    }
                  })
                  }
                  {context.AdminMode ?

                    <TableRow>

                      <TableCell colSpan={2}>
                        <FormControl className={classes.margin}>
                          <BootstrapInput
                            defaultValue={context.currentItem}
                            id="currentItem"
                            onChange={context.handleChangeFunction}
                            style={{width: '120px'}}
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell colSpan={1}>
                        <FormControl className={classes.margin}>
                          <BootstrapInput
                            defaultValue={context.amountOfItem}
                            id="amountOfItem"
                            onChange={context.handleChangeFunction}
                            style={{width: '30px'}}
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => {
                            context.handleSubmitFunction(context.currentItem, context.amountOfItem, cat)
                          }}
                          size="small"
                          variant="contained"
                        >
                        Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                    :
                    null
                  }
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardActions className={classes.actions} />
        </Card>
      )}
    </MyContext.Consumer>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string
};

export default UsersTable;
