import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import {
    createContactController,
    deleteContactByIdController,
    getContactByIdController,
    getContactsController,
    patchContactController,
} from "../controllers/contacts.js";


const contactsRouter = Router();

contactsRouter.get('/contacts', ctrWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', ctrWrapper(getContactByIdController));

contactsRouter.post('/contacts', ctrWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', ctrWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', ctrWrapper(deleteContactByIdController));


export default contactsRouter;









