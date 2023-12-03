import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
const contactsPath = path.resolve("db", "contacts.json");

const stringyfyContacts = (contactlist) =>
  fs.writeFile(contactsPath, JSON.stringify(contactlist, null, 2));

export const listContacts = async () => {
  const contactlist = await fs.readFile(contactsPath);

  return JSON.parse(contactlist);
};

export const getContactById = async (id) => {
  const contactlist = await listContacts();

  const contId = await contactlist.find((item) => item.id === id);

  return contId || null;
};

export const addContact = async (data) => {
  const newContact = {
    id: nanoid(),
    ...data,
  };

  const contactlist = await listContacts();
  contactlist.push(newContact);

  await stringyfyContacts(contactlist);
  return contactlist;
};

export const removeContact = async (id) => {
  const contactlist = await listContacts();

  const index = contactlist.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [contact] = contactlist.splice(index, 1);

  await stringyfyContacts(contactlist);

  return contact;
};
