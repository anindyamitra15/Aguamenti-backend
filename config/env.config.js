const dotenv = require("dotenv");
if (!process.env.NODE_ENV) require("dotenv").config();
//from .env
else {
  require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
  //from .env.development or .env.production
}
//parse the variables
const port = process.env.PORT || 3000;
const mongo_uri = String(process.env.MONGO_URI);
//export the necessary variables
module.exports = { port, mongo_uri, };
