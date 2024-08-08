import { initMongoConnection } from "./db/initMongoConnection.js";
import { Contact } from "./db/models/contacts.js";
import { setupServer } from "./server.js";


(async () => {
    await initMongoConnection();
    const contacts = await Contact.find({});
    console.log(contacts);
    setupServer();
})();
