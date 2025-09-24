//The dotenv is used to load variables from a .env file and puts it into the process.env
require("dotenv").config();

const {MongoClient} = require("mongodb");

async function main() {
    //gets the URI from the .env file. It's to prevent sensitive information
    //from getting pushed to github.
    const mongodbURI = process.env.MONGODB_URI;
    const client = new MongoClient(mongodbURI);

    try {
        await client.connect();

        await listDatabases(client);

    } catch (error) {
        console.error(error);

    } finally {
        await client.close();
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

main()