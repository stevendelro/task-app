import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewTask } from '../../actions/userActionCreators';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  form: {
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 9),
    },
  },
  chipBox: {
    padding: theme.spacing(1),
  },
  textField: {
    paddingBottom: theme.spacing(1),
  },
  tagField: {
    paddingBottom: theme.spacing(4),
  },
  radioGroup: {
    margin: theme.spacing(2, 2, 2, 0),
  },
  priorityGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const NewTaskForm = ({ addNewTask, userId, username }) => {
  const classes = useStyles();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [tagString, setTagString] = useState('');
  const [tagArray, setTagArray] = useState('');

  const [primaryLevel, setPrimaryLevel] = useState('high');
  const [primaryValue, setPrimaryValue] = useState(1);

  const [importance, setImportance] = useState(null);
  const [secondaryValue, setSecondaryValue] = useState(null);

  const handleTaskTitle = event => {
    console.log(`event`, event.target.value);
    setTaskTitle(event.target.value);
    console.log(`taskTitle`, taskTitle);
  };
  const handleTaskDetail = event => {
    setTaskDetails(event.target.value);
  };

  const handlePrimaryChange = event => {
    setPrimaryValue(Number(event.target.value));

    if (event.target.value === 1) {
      setPrimaryLevel('low');
    }
    if (event.target.value === 2) {
      setPrimaryLevel('high');
    }
    if (event.target.value === 3) {
      setPrimaryLevel('urgent');
    }
  };

  const handleSecondaryChange = event => {
    if (event.target.value === 'less') {
      setImportance(event.target.value);
      setSecondaryValue(1);
    }
    if (event.target.value === 'more') {
      setImportance(event.target.value);
      setSecondaryValue(2);
    }
  };

  const handleAddTags = event => {
    setTagString(event.target.value);
    // BUG: setTagString is one key behind setting the state.
    console.log(`tagString: `, tagString);
    console.log('targetVal: ', event.target.value);
    const wordArray = tagString.replace(/[ \t]/g, '').split(',');
    setTagArray(wordArray);
    console.log(`wordArray`, wordArray);
  };

  const handleTaskDataFormat = () => {
    const withoutEmptyStrings = [];
    tagArray.forEach(tagArrayItem => {
      if (tagArrayItem.length !== 0) withoutEmptyStrings.push(tagArrayItem);
    });
    setTagArray(withoutEmptyStrings);
  };

  const resetForm = () => {
    setTagString('');
    setTaskTitle('');
    setTaskDetails('');
    setPrimaryLevel('low');
    setPrimaryValue(1);
    setImportance('less');
    setSecondaryValue(1);
  };

  const HARDCODED_USER_ID = '60d37a2685024e535e0d3084'

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(`userId: `, userId);
    try {
      const tasklist = await axios.post(
        `/user/task?userid=${HARDCODED_USER_ID}`,
        {
          author: username,
          tasktitle: taskTitle,
          details: taskDetails,
          priority: {
            primary: {
              level: primaryLevel,
              value: primaryValue,
            },
            secondary: {
              importance: importance,
              value: secondaryValue,
            },
          },
          tags: [...tagArray],
        }
      );
      resetForm()
      console.log(`task`, tasklist);
      addNewTask(tasklist);
    } catch (error) {
      console.error('ERROR IN CREATING A NEW TASK USER: ', error);
      // Figure out a way to display to the user that an error occured here.
    }
  };
  return (
    <div>
      <div className={classes.toolbar} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h3" component="h1" gutterBottom>
          New task
        </Typography>
        <TextField
          className={classes.textField}
          fullWidth
          label="Title"
          variant="outlined"
          value={taskTitle}
          onChange={handleTaskTitle}
        />
        <TextField
          className={classes.textField}
          fullWidth
          label="Details (optional)"
          variant="outlined"
          value={taskDetails}
          onChange={handleTaskDetail}
        />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start">
          <FormControl className={classes.radioGroup} component="fieldset">
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              row
              aria-label="priority"
              name="priority"
              value={primaryValue}
              onChange={handlePrimaryChange}>
              <FormControlLabel
                value={1}
                control={<Radio color="secondary" />}
                label="Low"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="secondary" />}
                label="High"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value={3}
                control={<Radio color="secondary" />}
                label="Urgent"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>

          <FormControl className={classes.radioGroup} component="fieldset">
            <FormLabel component="legend">Importance</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={importance}
              onChange={handleSecondaryChange}>
              <FormControlLabel
                value="less"
                numvalue={1}
                control={<Radio color="primary" />}
                label="Less"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="more"
                numvalue={2}
                control={<Radio color="primary" />}
                label="More"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <TextField
          className={classes.tagField}
          fullWidth
          label="Add Tags"
          onChange={handleAddTags}
          value={tagString}
          variant="outlined"
        />
        <Button
          type="submit"
          onClick={handleTaskDataFormat}
          fullWidth
          variant="contained"
          color="secondary">
          add task
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  username: state.user.username,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewTask }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
