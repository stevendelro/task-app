import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

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
  passwordField: {
    width: '50%',
    paddingRight: theme.spacing(1),
  },
  confirmField: {
    width: '50%',
  },
  loginLink: {
    margin: theme.spacing(2, 1),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [checkbox, setCheckBox] = useState(false);

  const handleCheck = () => setCheckBox(!checkbox);
  return (
    <form className={classes.form}>
      <Typography variant="h2" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        className={classes.usernameField}
        fullWidth
        label="Username"
        variant="outlined"
      />
      <TextField
        className={classes.emailField}
        fullWidth
        label="Email"
        variant="outlined"
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center">
        <TextField
          className={classes.passwordField}
          label="Password"
          variant="outlined"
        />
        <TextField
          className={classes.confirmField}
          label="Confirmation"
          variant="outlined"
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center">
        <Typography variant="body2" className={classes.loginLink}>
          Remember me{' '}
          <Checkbox
            checked={checkbox}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
        <Typography variant="body2" className={classes.loginLink}>
          <Link href="#">Already a user? Log in</Link>
        </Typography>
      </Grid>
      <Button fullWidth variant="contained" color="secondary">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUp;
