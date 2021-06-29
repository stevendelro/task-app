import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
}));

function TaskTitleBar({
  taskState,
  isEditingThisTask,
  editedTitle,
  handleTitleEdit,
}) {
  const classes = useStyles();

  return (
    <FormControlLabel
      aria-label="Acknowledge"
      onClick={event => {
        event.stopPropagation();
      }}
      onFocus={event => event.stopPropagation()}
      control={
        taskState.priority.secondary.importance.toLowerCase() === 'high' ? (
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
          {isEditingThisTask ? (
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
  );
}

export default TaskTitleBar;
