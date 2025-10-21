const mongodb = require("../../db/mongodbConnect");
const ObjectId = require("mongodb").ObjectId;

// Function to show the lists within the mongo database
async function allContacts(req, res) {
  const db = mongodb.getDb();
  const contactList = await db.collection("contacts").find().toArray();

  if (!contactList || contactList.length === 0) {
    res.status(400).json({
      message: "Contact not found."
    });
  }

  res.status(200).json(contactList);
  // console.log("All Contacts:");
  // contactList.forEach((contact) => console.log(contact));
}

async function singleContact(req, res) {
  const db = mongodb.getDb();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Use a valid id."
    });
  }

  const contactId = new ObjectId(id);

  const contact = await db.collection("contacts").find({
    _id: contactId
  }).toArray();
  if (!contact || contact.length === 0) {
    res.status(400).json({
      message: "Contact not found."
    });
  }

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

  if (contact.acknowledged) {
    res.status(201).json(contact);
    console.log("New Contact:");
    console.log(contact);
  } else {
    res.status(500).json({
      message: "Failed to create contact."
    });
  }
}

async function updateContact(req, res) {
  const db = mongodb.getDb();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Use a valid id."
    });
  }

  const contactId = new ObjectId(id);

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

  if (contact.modifiedCount > 0) {
    res.status(204).send();
    console.log("Updated Contact:");
    console.log(contact);
  } else {
    res.status(500).json({
      message: "Failed to update contact."
    });
  }
}

async function deleteContact(req, res) {
  const db = mongodb.getDb();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Use a valid id."
    });
  }

  const contactId = new ObjectId(id);

  const contact = await db.collection("contacts").deleteOne({
    _id: contactId
  });

  if (contact.deletedCount > 0) {
    res.status(204).send();
    console.log("Deleted Contact:");
    console.log(contact);
  } else {
    res.status(500).json({
      message: "Failed to delete contact."
    });
  }


}

module.exports = {
  allContacts,
  singleContact,
  createContact,
  updateContact,
  deleteContact
};