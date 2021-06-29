import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import TaskButtonGroup from './TaskButtonGroup';
import TaskDetails from './TaskDetails';
import TaskRadioGroup from './TaskRadioGroup';
import TaskTitleBar from './TaskTitleBar';

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
    taskItemContainer: {
      paddingLeft: theme.spacing(1),
      backgroundColor: taskState.completed
        ? theme.palette.grey[300]
        : theme.palette.common.white,
    },
    taskFooter: {
      margin: theme.spacing(3, 0),
    },
  }));
  const classes = useStyles();
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
      author: userState.username || 'steven', // hardcoded 'steven' for development.
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

  const isEditingThisTask =
    userState.currentlyEditing && currentTaskId === userState.taskInEdit;

  return (
    <li className={classes.accordian}>
      <Accordion className={classes.taskItemContainer}>
        {/* SUMMARY */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() =>
            userState.currentlyEditing ? handleToggleEdit() : null
          }
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header">
          <TaskTitleBar
            taskState={taskState}
            isEditingThisTask={isEditingThisTask}
            editedTitle={editedTitle}
            handleTitleEdit={handleTitleEdit}
          />
        </AccordionSummary>

        {/* DETAILS */}
        <AccordionDetails>
          <TaskDetails
            isEditingThisTask={isEditingThisTask}
            editedDetails={editedDetails}
            handleDetailsEdit={handleDetailsEdit}
            details={taskState.details}
          />
        </AccordionDetails>
        <Box className={classes.taskFooter}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="center">
            <TaskRadioGroup
              inTagEditMode={inTagEditMode}
              primaryValue={primaryValue}
              handlePrimaryChange={handlePrimaryChange}
              taskImportance={taskImportance}
              handleSecondaryChange={handleSecondaryChange}
              tagEdits={tagEdits}
              setTagEdits={setTagEdits}
              isEditingThisTask={isEditingThisTask}
              tags={taskState.tags}
            />
            <TaskButtonGroup
              isEditingThisTask={isEditingThisTask}
              handleTagEditSubmit={handleTagEditSubmit}
              handleToggleTagEdit={handleToggleTagEdit}
              handleCancelEdit={handleCancelEdit}
              disableSubmitOnTagEdit={disableSubmitOnTagEdit}
              handleSubmitAllEdits={handleSubmitAllEdits}
              handleTaskComplete={handleTaskComplete}
              handleToggleEdit={handleToggleEdit}
              handleTaskDelete={handleTaskDelete}
              isComplete={isComplete}
              inTagEditMode={inTagEditMode}
            />
          </Grid>
        </Box>
      </Accordion>
    </li>
  );
}

export default Task;
