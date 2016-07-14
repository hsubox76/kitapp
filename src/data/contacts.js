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
export const contacts = [
  {
    id: 1,
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
  {
    id: 2,
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
      { id: 3, type: FAM_TYPE.PARTNER, title: 'husband' },
      { id: 4, type: FAM_TYPE.CHILD, title: 'kid' }
    ]
  },
  {
    id: 3,
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
      { id: 2, type: FAM_TYPE.PARTNER, title: 'husband' },
      { id: 4, type: FAM_TYPE.CHILD, title: 'kid' }
    ]
  },
  {
    id: 4,
    name: 'Davis',
    connection: CONTACT_TYPE.SECONDARY,
    birthdate: '01-01-2011'
  }
];
