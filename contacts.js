const path = require("path");
const fs = require("fs").promises;
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  await console.log(parsedData);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  const result = await parsedData.find((item) => Number(item.id) === contactId);
  console.log(result);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  const delContact = await parsedData.find(
    (item) => Number(item.id) === contactId
  );
  if (delContact) {
    const index = parsedData.indexOf(delContact);
    parsedData.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");
  } else {
    return console.log(`Contact with id=${contactId} not found!!!`.red);
  }
  await console.log(`Contact with id=${contactId} is removed`.green);
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = await JSON.parse(data);
    const id = await createId(parsedData);

    const newContact = { id, name, email, phone };
    const refreshedContacts = [...parsedData, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(refreshedContacts),
      "utf-8"
    );
    await console.log(`Contact with id=${id} is added`.green);
  } catch (e) {
    console.error(e);
  }
}

function createId(data) {
  const arrId = data.map((item) => item.id);
  let max = 0;
  for (id of arrId) {
    if (id > max) {
      max = Number(id);
    }
  }
  return String(max + 1);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
