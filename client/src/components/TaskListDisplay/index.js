import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as actionCreators from '../../actions/userActionCreators';
import Task from './Task';
import { tasks } from './fakeTasks';

const useStyles = makeStyles(theme => ({
  addTaskMessage: {
    height: '100%',
    width: '90%',
    padding: theme.spacing(3),
  },
}));

export const TaskListDisplay = ({ user, editTask, deleteTask, toggleEditMode }) => {
  const classes = useStyles();

  const addTaskMessage = message => (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.addTaskMessage} elevation={3}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h3" component="h2">
            {message}
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );

  const tasklist = tasks.map(task => {
    return (
      <Task
        key={task._id}
        currentTaskId={task._id}
        userState={user}
        taskState={task}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleEditMode={toggleEditMode}
      />
    );
  });
  console.log(`user`, user.tasklist);
  return <ul>{tasks.length > 0 ? tasklist : addTaskMessage('Add a task')}</ul>;
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editTask: actionCreators.editTask,
      deleteTask: actionCreators.deleteTask,
      toggleEditMode: actionCreators.toggleEditMode,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDisplay);
