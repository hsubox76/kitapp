import { ACTIONS } from '../actions/types';

export default function contacts(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STORE:
      return action.payload.contacts;
    default:
      return state;
  }
}
