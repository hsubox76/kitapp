import { METHOD_TYPE } from './constants';

export const events = [
  {
    id: 1,
    contactId: 1,
    name: 'text Mom',
    time: 1467590156054,
    method: METHOD_TYPE.TEXT
  },
  {
    id: 2,
    contactId: 2,
    name: 'email Kevin',
    time: 1467668604015,
    method: METHOD_TYPE.EMAIL
  },
  {
    id: 3,
    contactId: 3,
    name: 'call Nathalie to ask how vacation to Mexico went'
      + 'and also talk about some other things too',
    time: 1468981860760,
    method: METHOD_TYPE.CALL
  },
  {
    id: 4,
    contactId: 1,
    name: 'email Mom about schedule',
    time: 1468981860760,
    method: METHOD_TYPE.EMAIL
  },
];
