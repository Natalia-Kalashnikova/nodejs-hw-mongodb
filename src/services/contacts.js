// import { Contact } from '../db/models/contacts.js';
// import { calculatePaginationInformation } from '../utils/сalculatePaginationData.js';
// import { SORT_ORDER } from '../constants/index.js';


// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//   const limit = perPage;
//   const skip = perPage * (page - 1);

//   const contactQuery = Contact.find();

//   if (filter.contactType) {
//     contactQuery.where('contactType').equals(filter.contactType);
//   }

//   if (filter.isFavourite !== undefined) {
//     contactQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   contactQuery.where('userId').equals(userId);

//   const [contactsCount, contacts] = await Promise.all([
//     Contact.find().merge(contactQuery).countDocuments(),
//     contactQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({
//         [sortBy]: sortOrder,
//       })
//     .exec(),
//   ]);

//   const paginationInformation = calculatePaginationInformation(
//     page,
//     perPage,
//     contactsCount,
//   );

//   return {
//     contacts,
//     ...paginationInformation,
//   };
// };

// export const getContactById = async (contactId, userId) => {
//   const contact = await Contact.findOne({_id: contactId, userId});
//   return contact;
// };

// export const createContact = async (payload, userId) => {
//   const contact = await Contact.create({...payload, userId});
//   return contact;
// };

// export const upsertContact = async (contactId, payload, userId) => {
//   return await Contact.findOneAndUpdate({_id: contactId, userId}, payload, { new: true });
// };

// export const deleteContactById = async (contactId, userId) => {
//   return await Contact.findOneAndDelete({_id: contactId, userId});
// };

import { Contact } from '../db/models/contacts.js';
import { calculatePaginationInformation } from '../utils/сalculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import { saveFile } from '../utils/saveFile.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = perPage * (page - 1);

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
    .exec(),
  ]);

  const paginationInformation = calculatePaginationInformation(
    page,
    perPage,
    contactsCount,
  );

  return {
    contacts,
    ...paginationInformation,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({_id: contactId, userId});
  return contact;
};

export const createContact = async ({photo, ...payload}, userId) => {
  const url = await saveFile(photo);

  const contact = await Contact.create({
    ...payload,
    userId,
    photoUrl: url
  });

  return contact;
};

export const upsertContact = async (
  contactId,
  {photo, ...payload},
  userId
) => {
    const url = await saveFile(photo);
  return await Contact.findOneAndUpdate(
    {_id: contactId, userId},
    {...payload, photoUrl:url},
    { new: true }
  );
};

export const deleteContactById = async (contactId, userId) => {
  return await Contact.findOneAndDelete({_id: contactId, userId});
};
