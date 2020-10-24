let mongoose = require('mongoose');

// create a model class

let booksModel = mongoose.Schema({
    Name: String,
    Author: String,
    Date: String,
    Type: String,
    Price: Number
},
{
    collection: "books",
    
});

module.exports = mongoose.model('Book', booksModel);