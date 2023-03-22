"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const Dog = require("./models/dogs.js");

async function seed() {
    // breed: {type: string, require: true}
mongoose.disconnect();

}

seed();