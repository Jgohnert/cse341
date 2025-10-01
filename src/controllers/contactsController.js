const mongodb = require("../../db/mongodbConnect");
const ObjectId = require("mongodb").ObjectId;

// Function to show the lists within the mongo database
async function allContacts(req, res) {
  const db = mongodb.getDb();
  const contactList = await db.collection("contacts").find().toArray();

  res.status(200).json(contactList);
  // console.log("All Contacts:");
  // contactList.forEach((contact) => console.log(contact));
}

async function singleContact(req, res) {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const contact = await db.collection("contacts").find({
    _id: contactId
  }).toArray();

  res.status(200).json(contact);
  // console.log("Single Contact:");
  // console.log(contact);
}

async function createContact(req, res) {
  const db = mongodb.getDb();

  const newInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const contact = await db.collection("contacts").insertOne(newInfo);

  res.status(201).json(contact);
  console.log("New Contact:");
  console.log(contact);
}

async function updateContact(req, res) {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const updatedInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const contact = await db.collection("contacts").replaceOne({
    _id: contactId
  }, updatedInfo);

  res.status(204).send();
  console.log("Updated Contact:");
  console.log(contact);
}

async function deleteContact(req, res) {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const contact = await db.collection("contacts").deleteOne({
    _id: contactId
  });

  res.status(200).send();
  console.log("Deleted Contact:");
  console.log(contact);
}

module.exports = {
  allContacts,
  singleContact,
  createContact,
  updateContact,
  deleteContact
};