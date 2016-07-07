export const CONTACT_TYPE = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
};

export const FAM_TYPE = {
  PARTNER: 'PARTNER',
  CHILD: 'CHILD',
  OTHER: 'OTHER'
};
/**
 * Rules:
 * - Don't store family for secondary contacts
 * - family member "title" is editable and displayed, "type" is not visible
 *   and hardcoded for system use
 * - birthdate format MM-DD-YYYY
 * **/
export const contacts = [
  {
    id: 1001,
    name: 'Mom',
    connection: CONTACT_TYPE.PRIMARY,
    phone: ['555-555-1234'],
    email: ['mom@mom'],
    text: ['555-555-1234'],
    birthdate: '09-09-1950',
  },
  {
    id: 1002,
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
    id: 1003,
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
    id: 1004,
    name: 'Davis',
    connection: CONTACT_TYPE.SECONDARY,
    birthdate: '01-01-2011'
  }
]