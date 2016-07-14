import { ACTIONS } from '../actions/types';

export default function events(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_EVENTS:
      // just overwrite for now, be more complex later
      return action.events;
    default:
      return state;
  }
}
