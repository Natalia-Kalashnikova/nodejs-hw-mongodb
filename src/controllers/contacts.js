import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    upsertContact
} from '../services/contacts.js';
import createHttpError from 'http-errors';
//  import mongoose from 'mongoose';


export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const id = req.params.contactId;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({
    //         status: 400,
    //         message: `Invalid contact ID: ${id}`,
    //     });
    // }

    const contact = await getContactById(id);

    if (!contact) {
        return res.status(404).json({
            status: 404,
            message: `Contact with id ${id} not found!`,
        });
    }

    res.json({
        status: 200,
        message: `Successfully get contact with id ${id}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const {body} = req;
    const contact = await createContact(body);

    res.status(201).json({
        status: 201,
        message: `Successfully created contact`,
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const id = req.params.contactId;
    const contact = await upsertContact(id, req.body);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully patched contact`,
        data: contact,
    });
};

export const deleteContactByIdController = async (req, res) => {
    const id = req.params.contactId;
    const contact = await deleteContactById(id);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
