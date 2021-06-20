// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment';
import * as actions from '../actions/actions';

const initialState = {
  author: '',
  tasktitle: '',
  details: '',
  priority: {
    primary: {
      level: 'low',
      value: 1,
    },
    secondary: {
      importance: 'secondary',
      value: 1,    },
  },
  completed: false,
  tags: [],
};

function taskReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.TASK_ADD_NEW:
      return state;
    case actions.TASK_DELETE:
      return state;
    case actions.TASK_EDIT:
      return state;
    default:
      return state;
  }
}

export default taskReducer;
