"use strict";
console.log('server is connected')
require("dotenv").config();
const axios = require('axios').default;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// const mongoose = require("mongoose");
// const Dog = require("./models/dog.js");

// mongoose.connect(process.env.DB_URL);  //need url

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Mongoose is connected");
// });

const PORT = process.env.PORT || 5000;

let dKey = process.env.dKey;
axios.defaults.headers.common['X-Api-Key'] = dKey;



app.get("/", (request, response) => {
  response.status(200).send("Hello! We're in the server!");
});

// app.get("/dogs", )// dogfunc
// app.post('/dogs', )// dogfunc
// app.delete('/dogs/:id', )// dogfunc

// async function getDogs(request, response, next) {
//   try {
//     let results = await Dog.find();
//     response.status(200).send(results);
//   } catch (error) {
//     next(error);
//   }
// }

app.get('/dogInfo', async (request, response, next) => {
  try {
    const searchQuery= request.query.searchQuery;
    // console.log(searchQuery, 'searchqy');
    let url = `https://api.api-ninjas.com/v1/dogs?name=${searchQuery}`;
    let dogData = await axios.get(url);
    console.log(dogData.data, 'dogdata');

    let dataToSend = dogData.data.map((description) => new Dog(description));
    console.log(dataToSend, 'datatosend');

    response.status(200).send(dataToSend);
  } catch (error) {
    next;
    (error);
  }
});

// async function getDogs(request, response, next) {
//   try {
//     let results = await Dog.find();
//     response.status(200).send(results);
//   } catch (error) {
//     next(error);
//   }
// }

// async function postDogs(request, response, next){
//   console.log('coming in on:', request.body);
//   try {
//     //add await
//     response.status(200).send(createDog);
//   } catch (error) {
//     next(error);
//   }
// }

// async function adoptDogs(request, response, next){
//   console.log('id', request.params.id);
//   try {
//     let id = request.params.id;
//     await Dog.findByIdAndDelete(id);
//     response.status(200).send('Dog found a home!');
//   } catch (error) {
//     next(error);
//   }
// }

class Dog{
  constructor(dogObject) {
    this.name = dogObject.name;
    this.barkingAmount = dogObject.barking;
    this.minHeight = dogObject.min_height;
    this.maxHeight = dogObject.max_height;
    this.minWeight = dogObject.min_weight;
    this.maxWeight = dogObject.max_weight;
    this.minLifeExpectancy = dogObject.min_life_expectancy;
    this.maxLifeExpectancy = dogObject.max_life_expectancy;
    this.energyAmount = dogObject.energy;
    this.howProtective = dogObject.protectiveness;
    this.trainable = dogObject.trainability;
    //different variable??
  }
}

app.get("*", (request, response) => {
  response.statue(404).send("Not available");
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
