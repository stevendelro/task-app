import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 9),
    },
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

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Enter a valid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password must be at least 6 characters.')
    .matches(/[a-zA-Z0-9]/, 'Password can only contain letters and numbers.'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const SignUp = ({ createNewUser, setHasAnAccount, hasAnAccount, history }) => {
  const classes = useStyles();
  const [checkbox, setCheckBox] = useState(false);

  const handleCheck = () => setCheckBox(!checkbox);
  const handleAlreadyUser = () => setHasAnAccount(!hasAnAccount);

  const onSubmit = async values => {
    try {
      const { data } = await axios.post('/user', {
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      });
      createNewUser(data.createdUser);
      history.push('/dashboard');
    } catch (error) {
      console.error('ERROR IN CREATING NEW USER: ', error)
      // Figure out a way to display to the user that an error occured here.
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Typography variant="h2" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        className={classes.usernameField}
        fullWidth
        label="Username"
        variant="outlined"
        {...formik.getFieldProps('username')}
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.errors.username && Boolean(formik.touched.username)}
        helperText={formik.touched.username ? formik.errors.username : ''}
      />
      <TextField
        className={classes.emailField}
        fullWidth
        label="Email"
        variant="outlined"
        {...formik.getFieldProps('email')}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email && Boolean(formik.touched.email)}
        helperText={formik.touched.email ? formik.errors.email : ''}
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
          {...formik.getFieldProps('password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password && Boolean(formik.touched.password)}
          helperText={formik.touched.password ? formik.errors.password : ''}
        />
        <TextField
          className={classes.confirmField}
          label="Confirmation"
          variant="outlined"
          {...formik.getFieldProps('passwordConfirmation')}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          error={
            formik.errors.passwordConfirmation &&
            Boolean(formik.touched.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : ''
          }
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
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
        <Typography variant="body2" className={classes.loginLink}>
          <Link onClick={handleAlreadyUser}>Already a user? Log in</Link>
        </Typography>
      </Grid>
      <Button type="submit" fullWidth variant="contained" color="secondary">
        Sign Up
      </Button>
    </form>
  );
};

export default withRouter(SignUp);
