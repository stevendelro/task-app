// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment';
import * as actions from '../actions/actions';

const initialState = {
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
      console.log(`TASKLIST PAYLOAD: `, payload)
      return {
        ...state,
        tasklist: [...state.tasklist, ...payload.data.tasklist]
      };
    case actions.TASK_DELETE:
      return state;
    case actions.TASK_EDIT:
      return state;
    default:
      return state;
  }
}

export default userReducer;


