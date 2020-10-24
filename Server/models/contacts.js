let mongoose = require('mongoose');

// create a model class

let bContacts = mongoose.Schema({
    Name: String,
    PNumber: Number,
    Email: String
},
{
    collection: "contacts",
    
});

module.exports = mongoose.model('Contact', bContacts);