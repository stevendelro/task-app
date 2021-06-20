// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment';
import * as actions from '../actions/actions';

const initialState = {
  name: '',
  avatar: '',
  username: '',
  email: '',
  password: '',
  tasklist: [],
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.USER_SIGN_UP:
      return state;
    case actions.USER_LOG_IN:
      return state;
    case actions.USER_LOG_OUT:
      return state;
    case actions.USER_EDIT:
      return state;
    case actions.USER_DELETE:
      return state;

    default:
      return state;
  }
}

export default userReducer;


