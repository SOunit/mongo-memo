const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.r27pb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database is not initialized");
  }
  return _db;
};

module.exports = { initDb, getDb };
