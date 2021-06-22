import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(0, 12),
  },
  usernameField: {
    paddingBottom: theme.spacing(1),
  },
  emailField: {
    paddingBottom: theme.spacing(1),
  },
  passwordField: {},
  confirmField: {
    width: '50%',
  },
  loginLink: {
    margin: theme.spacing(2, 1),
  },
}));

function Login() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const handleCheck = () => setChecked(!checked);
  return (
    <form className={classes.form}>
      <Typography variant="h3" component="h1" gutterBottom>
        Log In
      </Typography>
      <TextField
        className={classes.emailField}
        fullWidth
        label="Email"
        variant="outlined"
      />
      <TextField
        className={classes.passwordField}
        fullWidth
        label="Password"
        variant="outlined"
      />
      <Grid
        container
        direction="row-reverse"
        justify="space-between"
        alignItems="center">
        <Typography variant="body2" className={classes.loginLink}>
          <Link href="#">Not a user? Sign up</Link>
        </Typography>
        <Typography variant="body2" className={classes.loginLink}>
          <Link href="#">Remember me</Link>
          <Checkbox
            checked={checked}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
      </Grid>
      <Button fullWidth variant="contained" color="secondary">
        Log In
      </Button>
    </form>
  );
}

export default Login;
