/**
  *  by : Marco Antonio Cavalcante
  *  index.js
  *  
  */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Defining port to run the API.
const porta = process.env.PORT || 7070;

// Allowing receipt of requests via JSON.
//Using the built-in body-parser middleware to parse JSON we will be using in the next steps.
app.use(bodyParser.json());

// Permitting access to API resources.
app.use(cors());


// Using the bodyParser.urlencoded function to parse the URL encoded body.
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );


// Associating the routes with the API application.
app.use('/',require('./src/router/router'));

app.listen(porta);
console.log("API na porta: "+porta);