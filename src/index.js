import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { Contact } from "./db/models/contacts.js";
import { setupServer } from "./server.js";
import { createFolderIfDoesNotExist } from "./utils/createDirIfNotExists.js";


(async () => {
    await initMongoConnection();
    const contacts = await Contact.find({});
    console.log(contacts);
    await createFolderIfDoesNotExist(TEMP_UPLOAD_DIR);
    await createFolderIfDoesNotExist(UPLOAD_DIR);
    setupServer();
})();
