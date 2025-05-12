const mongoose = require("mongoose");
require("dotenv").config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  MONGODB_LOCAL_PORT,
  DB_HOST,
} = process.env;

const host = DB_HOST || "localhost";

const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${host}:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}?authSource=admin`;

const db = {};
db.mongoose = mongoose;
db.url = url;

db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;

