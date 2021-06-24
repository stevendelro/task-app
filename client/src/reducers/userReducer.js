import * as actions from '../actions/actions';

const initialState = {
  currentlyEditing: false,
  taskInEdit: '',
  avatar: '',
  userId: '',
  username: '',
  email: '',
  tasklist: [],
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.USER_SIGN_UP:
      return {
        ...state,
        userId: payload._id,
        username: payload.username,
        email: payload.email,
      };
    case actions.USER_LOG_IN:
      return state;
    case actions.USER_LOG_OUT:
      return state;
    case actions.USER_EDIT:
      return state;
    case actions.USER_DELETE:
      return state;
    case actions.TASK_CREATE:
      return {
        ...state,
        tasklist: [...state.tasklist, ...payload.data.tasklist]
      };
    case actions.TASK_DELETE:
      return state;
    case actions.TASK_EDIT:
      return state;
    case actions.EDIT_MODE:
      return {
        ...state,
        currentlyEditing: !state.currentlyEditing,
        taskInEdit: state.currentlyEditing ? '' : payload,
      };
    default:
      return state;
  }
}

export default userReducer;


