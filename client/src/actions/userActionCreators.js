import * as actions from './actions';

export const createNewUser = user => ({
  type: actions.USER_SIGN_UP,
  payload: user,
});

export const loginUser = user => ({
  type: actions.USER_LOG_IN,
  payload: user,
});

export const editUser = edits => ({
  type: actions.USER_EDIT,
  payload: edits,
});

export const deleteUser = id => ({
  type: actions.USER_EDIT,
  payload: id,
});

export const addNewTask = taskList => ({
  type: actions.TASK_CREATE,
  payload: taskList,
});

export const editTask = tasklist => ({
  type: actions.TASK_EDIT,
  payload: { tasklist },
});
export const toggleEditMode = taskid => ({
  type: actions.TASK_EDIT_MODE,
  payload: taskid,
});

export const toggleTaskComplete = taskid => ({
  type: actions.TASK_TOGGLE_COMPLETE,
  payload: { taskid },
});

export const deleteTask = tasklist => ({
  type: actions.TASK_EDIT,
  payload: { tasklist },
});
