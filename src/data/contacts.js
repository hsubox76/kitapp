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
    rotations: [
      {
        every: [1, 'weeks'],
        name: 'call Mom',
        starting: '07-01-2016 00:00',
        contactMethodId: 1
      },
      {
        every: [2, 'days'],
        name: 'text Mom',
        starting: '07-01-2016 20:00',
        contactMethodId: 2
      }
    ],
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
    phone: ['555-555-1234'],
    email: ['kevin@kevin'],
    text: ['555-555-1234'],
    family: [
      { id: 1003, type: FAM_TYPE.PARTNER, title: 'wife' },
      { id: 1004, type: FAM_TYPE.CHILD, title: 'kid' }
    ],
    birthdate: '01-01-1979'
  },
  {
    id: 3,
    name: 'Nathalie',
    connection: CONTACT_TYPE.PRIMARY,
    cell: '555-555-1236',
    email: 'w@z.com',
    birthdate: '01-01-1980',
    family: [
      { id: 1002, type: FAM_TYPE.PARTNER, title: 'husband' },
      { id: 1004, type: FAM_TYPE.CHILD, title: 'kid' }
    ]
  },
  {
    id: 4,
    name: 'Davis',
    connection: CONTACT_TYPE.SECONDARY,
    birthdate: '01-01-2011'
  }
];
