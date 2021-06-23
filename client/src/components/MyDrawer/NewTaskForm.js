import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  form: {
    padding: theme.spacing(0, 2),
  },
  usernameField: {
    paddingBottom: theme.spacing(1),
  },
  emailField: {
    paddingBottom: theme.spacing(1),
  },
  passwordField: {
    paddingBottom: theme.spacing(1),
  },
}));

function NewTaskForm() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <form className={classes.form}>
        <Typography variant="h3" component="h1" gutterBottom>
          New task
        </Typography>
        <TextField
          className={classes.emailField}
          fullWidth
          label="Title"
          variant="outlined"
          // {...formik.getFieldProps('email')}
          // onChange={formik.handleChange}
          // value={formik.values.email}
          // error={formik.errors.email && Boolean(formik.touched.email)}
          // helperText={formik.touched.email ? formik.errors.email : ''}
        />
        <TextField
          className={classes.passwordField}
          fullWidth
          label="Details"
          variant="outlined"
          // {...formik.getFieldProps('password')}
          // onChange={formik.handleChange}
          // value={formik.values.password}
          // error={formik.errors.password && Boolean(formik.touched.password)}
          // helperText={formik.touched.password ? formik.errors.password : ''}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top">
            <FormControlLabel
              value="top"
              control={<Radio color="primary" />}
              label="Low"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="start"
              control={<Radio color="primary" />}
              label="High"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="bottom"
              control={<Radio color="primary" />}
              label="Urgent"
              labelPlacement="bottom"
            />
          </RadioGroup>
          <FormLabel component="legend">Importance</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top">
            <FormControlLabel
              value="start"
              control={<Radio color="primary" />}
              label="Less"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="bottom"
              control={<Radio color="primary" />}
              label="More"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="secondary">
          add task
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);

