import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import {
    createContactController,
    deleteContactByIdController,
    getContactByIdController,
    getContactsController,
    patchContactController,
} from "../controllers/contacts.js";
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { isValidId } from '../middlewares/isValidId';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', isValidId, ctrWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactSchema), ctrWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', isValidId, ctrWrapper(deleteContactByIdController));


export default contactsRouter;









