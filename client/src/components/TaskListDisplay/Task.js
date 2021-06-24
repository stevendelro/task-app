import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import Typography from '@material-ui/core/Typography';
import TaskFooter from './TaskFooter';

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
      backgroundColor: taskState.completed
        ? theme.palette.grey[300]
        : theme.palette.common.white,
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
    editTitle: {
      color: theme.palette.grey[600],
    },
    editDetails: {
      color: theme.palette.grey[600],
      marginLeft: '29px',
      width: '90%',
    },
    taskFooter: {
      margin: theme.spacing(3, 0),
    },
  }));
  const classes = useStyles();
  const { importance } = taskState.priority.secondary;
  const [tagArray, setTagArray] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [inTagEditMode, setInTagEditMode] = useState(false);
  const [tagEdits, setTagEdits] = useState(taskState.tags.join(', '));
  const [editedTitle, setEditedTitle] = useState(taskState.tasktitle);
  const [editedDetails, setEditedDetails] = useState(taskState.details);
  const [disableSubmitOnTagEdit, setDisableSubmitOnTaskEdit] = useState(false);
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

  const handleToggleEdit = () => toggleEditMode(currentTaskId);
  const handleTitleEdit = event => setEditedTitle(event.target.value);
  const handleDetailsEdit = event => setEditedDetails(event.target.value);
  const handleToggleTagEdit = () => {
    setInTagEditMode(!inTagEditMode);
    setDisableSubmitOnTaskEdit(!disableSubmitOnTagEdit);
    return;
  };

  const handleTaskComplete = () => {
    setIsComplete(!isComplete);
    toggleTaskComplete(currentTaskId);
    return;
  };

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
    setDisableSubmitOnTaskEdit(!disableSubmitOnTagEdit);
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

  const handleTaskDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/user/task/delete?userid=${userState.userId}&taskid=${currentTaskId}`
      );
      deleteTask(data.tasklistWithTaskDeleted);
    } catch (error) {
      console.error('ERROR IN DELETING TASK: ', error);
    }
  };

  const handleSubmitAllEdits = async () => {
    const taskEdits = {
      author: userState.username || 'steven',
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
    try {
      const { data } = await axios.post(
        `/user/task/edit?userid=${userState.userId}&taskid=${currentTaskId}`,
        taskEdits
      );
      editTask(data.tasklistWithEdits);
    } catch (error) {
      console.error('ERROR IN SUBMITTING TASK EDITS: ', error);
    }
  };



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
                    className={classes.editTitle}
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
              <TaskFooter
                inTagEditMode={inTagEditMode}
                primaryValue={primaryValue}
                handlePrimaryChange={handlePrimaryChange}
                taskImportance={taskImportance}
                handleSecondaryChange={handleSecondaryChange}
                tagEdits={tagEdits}
                setTagEdits={setTagEdits}
              />
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
                <Button
                  disabled={disableSubmitOnTagEdit}
                  onClick={handleSubmitAllEdits}>
                  Submit
                </Button>
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
                <Button onClick={handleTaskDelete}>Delete</Button>
              </ButtonGroup>
            )}
          </Grid>
        </Box>
      </Accordion>
    </li>
  );
}

export default Task;
