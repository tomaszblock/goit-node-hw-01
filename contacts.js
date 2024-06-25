import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = join(__dirname, "/db/contacts.json");

const findContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return data.toString();
  } catch (err) {
    console.log(err.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await findContacts(contactId);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      return contact;
    } else {
      console.log("Contact not found");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await findContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (err) {
    console.log(err.message);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await findContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.log(err.message);
  }
};