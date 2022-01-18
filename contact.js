const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = await JSON.parse(data);
    console.table(contactsList);
    return contactsList;
  } catch (error) {
    error.message;
  }
}

async function getContactById(id) {
  try {
    const contactsList = await listContacts();
    const result = await contactsList.find((item) => item.id === id);
    if (!result) {
      return null;
    }
    console.log(result);
    return result;
  } catch (error) {
    error.message;
  }
}

async function removeContact(id) {
  try {
    const contactsList = await listContacts();
    const idx = await contactsList.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }

    const newContacts = await contactsList.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.log(newContacts);
    return newContacts;
  } catch (error) {
    error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    await contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
    return newContact;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
