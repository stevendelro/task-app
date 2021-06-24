import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

function Task({
  userState,
  taskState,
  editTask,
  deleteTask,
  toggleEditMode,
  currentTaskId,
  toggleTaskComplete,
}) {
  const useStyles = makeStyles(theme => ({
    accordian: {
      width: '100%',
      listStyle: 'none',
      padding: theme.spacing(1, 0),
    },
    chipTagGroup: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(1, 0),
    },
    chipTag: {
      marginLeft: theme.spacing(1),
    },
    buttonGroup: {
      height: '42px',
      padding: theme.spacing(0, 3),
    },
    taskItemContainer: {
      paddingLeft: theme.spacing(1),
      backgroundColor: taskState.completed ? '' : theme.palette.grey[300],
    },
    titleContainer: {
      paddingLeft: theme.spacing(2),
    },
    titleText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      height: '32px',
    },
    tagEditField: {
      marginLeft: '45px',
    },
    taskPriorityRadios: {
      marginLeft: '8px',
      borderRight: '1px solid rgba(0, 0, 0, 0.30)',
    },
    taskPriorityRadioGroup: {
      paddingRight: theme.spacing(2),
    },
    taskImportanceRadios: {
      marginRight: theme.spacing(2),
    },
    editDetails: {
      marginLeft: '29px',
      width: '90%',
    },
    taskFooter: {
      margin: theme.spacing(3, 0),
    },
  }));
  const classes = useStyles();
  const currentlyEditing = false;
  const { importance } = taskState.priority.secondary;
  const [tagArray, setTagArray] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [inTagEditMode, setInTagEditMode] = useState(false);
  const [tagEdits, setTagEdits] = useState(taskState.tags.join(', '));
  const [editedTitle, setEditedTitle] = useState(taskState.tasktitle);
  const [editedDetails, setEditedDetails] = useState(taskState.details);
  const [primaryLevel, setPrimaryLevel] = useState(
    taskState.priority.primary.level
  );
  const [primaryValue, setPrimaryValue] = useState(
    taskState.priority.primary.value
  );
  const [taskImportance, setTaskImportance] = useState(
    taskState.priority.secondary.importance
  );
  const [secondaryValue, setSecondaryValue] = useState(
    taskState.priority.secondary.value
  );

  const handleTitleEdit = event => setEditedTitle(event.target.value);
  const handleDetailsEdit = event => setEditedDetails(event.target.value);
  const handleTaskComplete = () => toggleTaskComplete(currentTaskId);
  const handleToggleTagEdit = () => setInTagEditMode(!inTagEditMode);
  const handleToggleEdit = () => toggleEditMode(currentTaskId);

  const handlePrimaryChange = event => {
    setPrimaryValue(Number(event.target.value));
    if (event.target.value === '1') setPrimaryLevel('low');
    if (event.target.value === '2') setPrimaryLevel('high');
    if (event.target.value === '3') setPrimaryLevel('urgent');
    return;
  };

  const handleSecondaryChange = event => {
    if (event.target.value === 'less') {
      setTaskImportance(event.target.value);
      setSecondaryValue(1);
    }
    if (event.target.value === 'more') {
      setTaskImportance(event.target.value);
      setSecondaryValue(2);
    }
    return;
  };

  const handleTagEditSubmit = () => {
    setInTagEditMode(!inTagEditMode);
    const withoutEmptyStrings = [];
    const wordArray = tagEdits.replace(/[ \t]/g, '').split(',');
    wordArray.forEach(tagArrayItem => {
      if (tagArrayItem.length !== 0) withoutEmptyStrings.push(tagArrayItem);
    });
    setTagArray(withoutEmptyStrings);
    return;
  };

  const handleCancelEdit = () => {
    handleToggleEdit();
    setInTagEditMode(false);
    setTagEdits(taskState.tags.join(', '));
    setTagArray([]);
    setIsComplete(false);
    setEditedTitle(taskState.tasktitle);
    setEditedDetails(taskState.details);
    setPrimaryLevel(taskState.priority.primary.level);
    setPrimaryValue(taskState.priority.primary.value);
    setTaskImportance(taskState.priority.secondary.importance);
    setSecondaryValue(taskState.priority.secondary.value);
    return;
  };

  const handleSubmitAllEdits = async () => {
    const taskEdits = {
      author: userState.username,
      tasktitle: editedTitle,
      details: editedDetails,
      priority: {
        primary: {
          level: primaryLevel,
          value: primaryValue,
        },
        secondary: {
          importance: taskImportance,
          value: secondaryValue,
        },
      },
      completed: isComplete,
      tags: [...tagArray],
    };
    console.log(`taskEdits: `, taskEdits);
    try {
      const updatedTaskList = await axios.post(
        `/user/task/edit?userid=${userState.userId}&taskid=${currentTaskId}`,
        taskEdits
      );
    } catch (error) {
      console.error('ERROR IN SUBMITTING TASK EDITS: ', error);
    }
  };

  let renderedTaskFooter;
  if (inTagEditMode) {
    renderedTaskFooter = (
      <TextField
        className={classes.tagEditField}
        variant="outlined"
        label="Edit Tags"
        value={tagEdits}
        onChange={event => setTagEdits(event.target.value)}
      />
    );
  } else {
    renderedTaskFooter = (
      <div>
        <FormControl
          className={classes.taskPriorityRadios}
          component="fieldset">
          <RadioGroup
            row
            className={classes.taskPriorityRadioGroup}
            aria-label="priority"
            name="priority"
            value={primaryValue}
            onChange={handlePrimaryChange}>
            <FormControlLabel
              value={1}
              control={<Radio color="secondary" />}
              label="Low"
              labelPlacement="start"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="secondary" />}
              label="High"
              labelPlacement="start"
            />
            <FormControlLabel
              value={3}
              control={<Radio color="secondary" />}
              label="Urgent"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          className={classes.taskImportanceRadios}
          component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={taskImportance}
            onChange={handleSecondaryChange}>
            <FormControlLabel
              value="less"
              numvalue={1}
              control={<Radio color="primary" />}
              label="Less"
              labelPlacement="start"
            />
            <FormControlLabel
              value="more"
              numvalue={2}
              control={<Radio color="primary" />}
              label="More"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  return (
    <li className={classes.accordian}>
      <Accordion className={classes.taskItemContainer}>
        {/* SUMMARY */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => {
            userState.currentlyEditing ? handleToggleEdit() : null;
          }}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header">
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => {
              event.stopPropagation();
            }}
            onFocus={event => event.stopPropagation()}
            control={
              importance.toLowerCase() === 'high' ? (
                <NewReleasesOutlinedIcon
                  color={taskState.completed ? 'inherit' : 'primary'}
                />
              ) : (
                <LabelOutlinedIcon
                  color={taskState.completed ? 'inherit' : 'primary'}
                />
              )
            }
            label={
              <div className={classes.titleContainer}>
                {userState.currentlyEditing &&
                currentTaskId === userState.taskInEdit ? (
                  <Input
                    value={editedTitle}
                    onChange={handleTitleEdit}
                    placeholder="Edit Task Title"
                    inputProps={{ 'aria-label': 'description' }}
                  />
                ) : (
                  <Typography className={classes.titleText} variant="body1">
                    {taskState.tasktitle}
                  </Typography>
                )}
              </div>
            }
          />
        </AccordionSummary>

        {/* DETAILS */}
        <AccordionDetails>
          {userState.currentlyEditing &&
          currentTaskId === userState.taskInEdit ? (
            <Input
              className={classes.editDetails}
              value={editedDetails}
              onChange={handleDetailsEdit}
              placeholder="Edit Details"
              inputProps={{ 'aria-label': 'description' }}
            />
          ) : (
            <Typography color="textSecondary">{taskState.details}</Typography>
          )}
        </AccordionDetails>
        <Box className={classes.taskFooter}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="center">
            {userState.currentlyEditing &&
            currentTaskId === userState.taskInEdit ? (
              renderedTaskFooter
            ) : (
              <div className={classes.chipTagGroup}>
                {taskState.tags.map((tag, index) => (
                  <Chip
                    className={classes.chipTag}
                    key={`tag-${tag}-${index}`}
                    variant="outlined"
                    size="small"
                    label={tag}
                    color="secondary"
                  />
                ))}
              </div>
            )}
            {userState.currentlyEditing &&
            currentTaskId === userState.taskInEdit ? (
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                aria-label="outlined primary button group">
                {inTagEditMode ? (
                  <Button onClick={handleTagEditSubmit}>submit tags</Button>
                ) : (
                  <Button onClick={handleToggleTagEdit}>edit tags</Button>
                )}
                <Button onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSubmitAllEdits}>Submit</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                aria-label="outlined primary button group">
                {isComplete ? (
                  <Button onClick={handleTaskComplete}>not done</Button> // Make the accordian close onComplete
                ) : (
                  <Button onClick={handleTaskComplete}>Done</Button>
                )}

                <Button onClick={handleToggleEdit}>Edit</Button>
                <Button>Delete</Button>
              </ButtonGroup>
            )}
          </Grid>
        </Box>
      </Accordion>
    </li>
  );
}

export default Task;
