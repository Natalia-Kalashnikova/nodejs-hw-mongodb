import { Contact } from '../db/models/contacts.js';


export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const upsertContact = async (id, payload) => {
  return await Contact.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteContactById = async (contactId) => {
  return await Contact.findOneAndDelete({_id: contactId});
};
