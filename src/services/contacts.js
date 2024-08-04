import { Contact } from '../db/models/contacts.js';


export const getAllContacts = async () => {
  return await Contact.find();
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
