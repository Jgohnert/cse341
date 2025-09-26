const  mongodb = require("../../db/mongodbConnect");
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

    const contact = await db.collection("contacts").find({ _id: contactId }).toArray();
    
    res.status(200).json(contact);
    // console.log("Single Contact:");
    // console.log(contact));
}

module.exports = {
  allContacts,
  singleContact
};