import { Contact } from '../db/models/contacts.js';
import { calculatePaginationInformation } from '../utils/сalculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy ='_id',
}) => {
  const skip = perPage * (page - 1);

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().countDocuments(),
    Contact.find()
      .skip(skip)
      .limit(perPage)
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

export const getContactById = async (contactId) => {
  const contact = await Contact.findOne({_id: contactId});
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const upsertContact = async (contactId, payload) => {
  return await Contact.findOneAndUpdate({_id: contactId}, payload, { new: true });
};

export const deleteContactById = async (contactId) => {
  return await Contact.findOneAndDelete({_id: contactId});
};
