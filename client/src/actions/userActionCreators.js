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
