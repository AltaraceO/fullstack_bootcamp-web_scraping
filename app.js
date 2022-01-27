require("dotenv").config({ path: "./config.env" });
require("./mongo/mongoose");
const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
