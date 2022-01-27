const mongoose = require("mongoose");
const password = "123Bank";
const database = "users";

const uri = `mongodb+srv://Ori:${password}@bank.0fmba.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
