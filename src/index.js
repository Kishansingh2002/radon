const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://kishan_31:4GdZARnCyGUbPKKw@cluster0.d5f50qs.mongodb.net/?retryWrites=true&w=majorityv", { userNewUrlParser: ture })
  .then(() => console.log('mongodb running on 27017'))
  .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 5001, function () {
  console.log('Express app running on port ' + (process.env.PORT || 5001))
});

