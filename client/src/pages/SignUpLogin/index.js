import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import * as actionCreators from '../../actions/userActionCreators';
import Copyright from '../../components/Copyright';
import SignUp from './SignUp';
import Login from './Login';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SignUpLoginPage({ createNewUser, loginUser }) {
  const classes = useStyles();
  const [hasAnAccount, setHasAnAccount] = useState(false)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.formSide}>
        <Container>
          {hasAnAccount ? (
            <Login
              loginUser={loginUser}
              setHasAnAccount={setHasAnAccount}
              hasAnAccount={hasAnAccount}
            />
          ) : (
            <SignUp
              createNewUser={createNewUser}
              setHasAnAccount={setHasAnAccount}
              hasAnAccount={hasAnAccount}
            />
          )}
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewUser: actionCreators.createNewUser,
      loginUser: actionCreators.loginUser,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SignUpLoginPage);
