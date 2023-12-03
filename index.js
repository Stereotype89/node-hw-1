import { program } from "commander";
import * as microServices from "./contacts.js";

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n ,--name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await microServices.listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await microServices.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await microServices.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await microServices.removeContact(id);

      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
