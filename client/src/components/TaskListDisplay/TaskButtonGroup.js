import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    height: '42px',
    padding: theme.spacing(0, 3),
  },
}));

function TaskButtonGroup({
  isEditingThisTask,
  handleTagEditSubmit,
  handleToggleTagEdit,
  handleCancelEdit,
  disableSubmitOnTagEdit,
  handleSubmitAllEdits,
  handleTaskComplete,
  handleToggleEdit,
  handleTaskDelete,
  isComplete,
  inTagEditMode,
}) {
  const classes = useStyles();
  if (isEditingThisTask) {
    return (
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
    );
  } else {
    return (
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
    );
  }
}

export default TaskButtonGroup;
