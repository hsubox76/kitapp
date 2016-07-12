import {
  CONTACT_TYPE,
  FAM_TYPE,
  CONTACT_NUMBER_TYPE,
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
    contactData: [
      {
        id: 1,
        type: CONTACT_NUMBER_TYPE.PHONE_NUMBER,
        data: '555-555-1234'
      },
      {
        id: 2,
        type: CONTACT_NUMBER_TYPE.PHONE_NUMBER,
        data: '555-111-1234'
      },
      {
        id: 3,
        type: CONTACT_NUMBER_TYPE.EMAIL_ADDRESS,
        data: 'mom@mom.mom'
      },
      {
        id: 4,
        type: CONTACT_NUMBER_TYPE.PHYSICAL_ADDRESS,
        data: {
          street: '123 Fake Street',
          city: 'Faketown',
          state: 'CA',
          postal: '90210',
          country: 'USA'
        }
      },
    ],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.CALL,
        useContactDataId: 2
      },
      {
        id: 2,
        type: METHOD_TYPE.TEXT,
        useContactDataId: 1
      },
      {
        id: 3,
        type: METHOD_TYPE.EMAIL,
        useContactDataId: 3
      },
      {
        id: 4,
        type: METHOD_TYPE.POSTAL,
        useContactDataId: 4
      },
    ],
  },
  {
    id: 2,
    name: 'Kevin',
    connection: CONTACT_TYPE.PRIMARY,
    birthdate: '07-07-1979',
    rotationsIds: [3],
    contactData: [
      {
        id: 1,
        type: CONTACT_NUMBER_TYPE.EMAIL_ADDRESS,
        data: 'kevin@kevin.kevin'
      },
    ],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.EMAIL,
        useContactDataId: 1
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
    contactData: [
      {
        id: 1,
        type: CONTACT_NUMBER_TYPE.PHONE_NUMBER,
        data: 'n@nat.nat'
      },
    ],
    contactMethods: [
      {
        id: 1,
        type: METHOD_TYPE.CALL,
        useContactDataId: 1
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
