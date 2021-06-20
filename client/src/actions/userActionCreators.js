import * as actions from './actions';

export const createNewUser = user => ({
  type: actions.USER_SIGN_UP,
  payload: user,
});

export const loginUser = ({ username, password }) => ({
  type: actions.USER_LOG_IN,
  payload: { username, password },
});

export const editUser = edits => ({
  type: actions.USER_EDIT,
  payload: edits,
});

export const deleteUser = id => ({
  type: actions.USER_EDIT,
  payload: id,
});
