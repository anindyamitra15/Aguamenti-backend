const mongoose = require("mongoose");
const { mongo_uri } = require("./env.config");

module.exports = mongoose.connect(
  mongo_uri, //uri to connect to
  {
    // configs
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      //error handling
      console.log("error: " + err + "\nexiting");
      client.close();
      //TODO - stop the server
    } else console.log("DB connection successful, go ahead..");
  }
);
