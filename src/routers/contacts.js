import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import {
    createContactController,
    deleteContactByIdController,
    getContactByIdController,
    getContactsController,
    patchContactController,
} from "../controllers/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/createContactSchema.js";
import { updateContactSchema } from "../validation/updateContactSchema.js";


const contactsRouter = Router();

contactsRouter.use('/contacts/:contactId', isValidId('contactId'));

contactsRouter.get('/contacts', ctrWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', ctrWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactSchema), ctrWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', ctrWrapper(deleteContactByIdController));


export default contactsRouter;
