const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri()
  console.log(uri)

  mongoose.connect(uri, { dbName: "boo" })
    .then(() => {
      console.log("MongoDB connected successfully")
    })
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`);
      throw new Error(error.message);
    });
}

module.exports = connect