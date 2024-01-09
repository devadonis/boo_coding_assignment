const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async () => {
  try {
    const mongod = await MongoMemoryServer.create();
    const URI = mongod.getUri();

    const mongooseConnection = await mongoose.connect(URI, { dbName: "boo" });
    console.log('MongoDB connected successfully');

    return mongooseConnection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw new Error(error.message);
  }
}

module.exports = connect;