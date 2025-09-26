//The dotenv is used to load variables from a .env file and puts it into the process.env
require("dotenv").config();

const {MongoClient} = require("mongodb");

//gets the URI from the .env file. It's to prevent sensitive information
//from getting pushed to github.
const client = new MongoClient(process.env.MONGODB_URI);

let _db;

async function connectDb() {
  try {
    if (_db) {
      console.log("DB is already initialized.");
      return _db;
    }

    _db = client.db("cse341");
    await client.connect();
    await listDatabases(client);

    return _db;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Function to show the lists within the mongo database
async function listDatabases(client) {
   const databasesList = await client.db().admin().listDatabases();
   console.log("databases:");
   databasesList.databases.forEach(db => {
    console.log(`▪ ${db.name}`);
   });
}

function getDb() {
  if (!_db) {
    throw Error("Database is not initialized.");
  }
  return _db;
}

module.exports = {
    getDb,
    connectDb
};