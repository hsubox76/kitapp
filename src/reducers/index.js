import contacts from './contacts';
import events from './events';
import ui from './ui';

export function reducer(state = {}, action) {
  return {
    contacts: contacts(state.contacts, action),
    events: events(state.events, action),
    ui: ui(state.ui, action)
  };
}
