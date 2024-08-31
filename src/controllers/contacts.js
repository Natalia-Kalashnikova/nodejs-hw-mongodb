import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    upsertContact
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId,
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};


export const getContactByIdController = async (req, res) => {
    const id = req.params.contactId;
    const userId = req.user._id;

    const contact = await getContactById(id, userId);

    if (!contact) {
        return res.status(404).json({
            status: 404,
            message: `Contact with id ${id} not found!`,
        });
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
    });
};


export const createContactController = async (req, res) => {
    const { body, user, file } = req;
    const contact = await createContact({...body, photo: file}, user._id);

    res.status(201).json({
        status: 201,
        message: `Successfully created contact`,
        data: contact,
    });
};


export const patchContactController = async (req, res) => {
    const{ params, body, file, user }=req;
    const contactId = params.contactId;

    const contact = await upsertContact(
        contactId,
        {...body, photo: file},
        user._id,
    );
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
    const userId = req.user._id;
    const contact = await deleteContactById(id, userId);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
