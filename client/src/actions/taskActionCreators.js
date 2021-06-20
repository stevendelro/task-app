import * as actions from './actions';

export const addNewTask = (userid, task) => ({
  type: actions.TASK_EDIT,
  payload: { userid, task },
});

export const editTask = (ids, task) => ({
  type: actions.TASK_EDIT,
  payload: { ids, task }
});

export const deleteTask = ({ userid, taskid }) => ({
  type: actions.TASK_EDIT,
  payload: { userid, taskid },
});
