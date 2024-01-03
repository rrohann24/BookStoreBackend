const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const colors = require('colors');
var cors = require('cors');
const Book = require('./models/bookModel.js');
const bookRoute = require('./routes/booksRoute.js')
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome');
});

app.use('/books', bookRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('database connected'.bgRed);
    app.listen(PORT, ()=>{
    console.log(`app listening at port: ${PORT}`.bgYellow);
});
}).catch((err) => {
    console.log(err);
});

module.exports = app;