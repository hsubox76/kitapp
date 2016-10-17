import {
  CONTACT_TYPE,
  FAM_TYPE,
  METHOD_TYPE
} from './constants';

/**
 * Rules:
 * - Don't store family for secondary contacts
 * - family member "title" is editable and displayed, "type" is not visible
 *   and hardcoded for system use
 * - birthdate format MM-DD-YYYY
 * **/
export const contacts = {
  a: {
    id: 'a',
    name: 'Mom',
    connection: CONTACT_TYPE.PRIMARY,
    birthdate: '09-09-1959',
    rotationIds: [1, 2],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.CALL,
        data: '555-555-1234'
      },
      {
        id: 2,
        type: METHOD_TYPE.TEXT,
        data: '555-111-1234'
      },
      {
        id: 3,
        type: METHOD_TYPE.EMAIL,
        data: 'mom@mom.mom'
      },
      {
        id: 4,
        type: METHOD_TYPE.POSTAL,
        data: {
          street: '123 Fake Street',
          city: 'Faketown',
          state: 'CA',
          postal: '90210',
          country: 'USA'
        }
      },
    ],
  },
  b: {
    id: 'b',
    name: 'Kevin',
    connection: CONTACT_TYPE.PRIMARY,
    birthdate: '07-07-1979',
    rotationsIds: [3],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.EMAIL,
        data: 'kevin@kevin.kevin'
      },
    ],
    family: [
      { id: 'c', type: FAM_TYPE.PARTNER, title: 'husband' },
      { id: 'd', type: FAM_TYPE.CHILD, title: 'kid' }
    ]
  },
  c: {
    id: 'c',
    name: 'Nathalie',
    connection: CONTACT_TYPE.PRIMARY,
    birthdate: '12-07-1980',
    rotationsIds: [4],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.CALL,
        data: '555-123-4567'
      },
    ],
    family: [
      { id: 'b', type: FAM_TYPE.PARTNER, title: 'husband' },
      { id: 'd', type: FAM_TYPE.CHILD, title: 'kid' }
    ]
  },
  d: {
    id: 'd',
    name: 'Davis',
    connection: CONTACT_TYPE.SECONDARY,
    birthdate: '01-01-2011'
  }
};
