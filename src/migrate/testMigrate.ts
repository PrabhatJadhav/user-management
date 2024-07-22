const { MongoClient } = require("mongodb");
require("dotenv").config();

const migrate = async () => {
  const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const sourceDb = client.db("sample_mflix");
    const destinationDb = client.db("test");

    const sourceCollection = sourceDb.collection("movies");
    const destinationCollection = destinationDb.collection("movies");

    const documents = await sourceCollection.find().toArray();
    if (documents.length > 0) {
      await destinationCollection.insertMany(documents);
      console.log(
        `Copied ${documents.length} documents from sourceCollection to destinationCollection.`
      );
    } else {
      console.log("No documents found in sourceCollection.");
    }
  } finally {
    await client.close();
  }
};

exports = { migrate };
