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
import { authenticate } from "../middlewares/authenticate.js";


const contactsRouter = Router();

contactsRouter.use('/:contactId', isValidId('contactId'));

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrWrapper(getContactByIdController));

contactsRouter.post('/', validateBody(createContactSchema), ctrWrapper(createContactController));

contactsRouter.patch('/:contactId', validateBody(updateContactSchema), ctrWrapper(patchContactController));

contactsRouter.delete('/:contactId', ctrWrapper(deleteContactByIdController));


export default contactsRouter;
