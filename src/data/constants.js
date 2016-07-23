export const CONTACT_TYPE = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
};

export const FAM_TYPE = {
  PARTNER: 'PARTNER',
  CHILD: 'CHILD',
  OTHER: 'OTHER'
};

export const METHOD_TYPE = {
  CALL: 'CALL',
  TEXT: 'TEXT',
  EMAIL: 'EMAIL',
  POSTAL: 'POSTAL'
};

export const METHOD_TYPE_LABELS = [
  { type: METHOD_TYPE.CALL, label: 'call' },
  { type: METHOD_TYPE.TEXT, label: 'text' },
  { type: METHOD_TYPE.EMAIL, label: 'email' },
  { type: METHOD_TYPE.POSTAL, label: 'mail' },
];

export const METHOD_TYPE_ICONS = {
  [METHOD_TYPE.CALL]: 'phone',
  [METHOD_TYPE.TEXT]: 'comments',
  [METHOD_TYPE.EMAIL]: 'envelope',
  [METHOD_TYPE.POSTAL]: 'home',
};

// export const CONTACT_NUMBER_TYPE = {
//   PHONE_NUMBER: 'PHONE_NUMBER',
//   EMAIL_ADDRESS: 'EMAIL_ADDRESS',
//   PHYSICAL_ADDRESS: 'PHYSICAL_ADDRESS'
// };

export const DATE_FORMAT = 'MM-DD-YYYY HH:mm';
