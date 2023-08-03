import { SET_NOTIF } from 'Actions/actionConstants';

const initialState = {
  message: '',
  variant: '',
  vertical: 'top',
  horizontal: 'right',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NOTIF:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
