let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let Contact = require("../models/contacts");



module.exports.displayContactList = (req, res, next) => {
    if(!req.user) {res.redirect('/login');}
    Contact.find((err, contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(contactList)
            res.render('business/business-contact', {title: 'Contact List', ContactsList: contactList});
        }
    });
}
module.exports.displayAddPage = (req, res, next) =>{
    res.render('business/add-contact', {title: 'Add Contact'});
} 

module.exports.processAddPage = (req, res, next) =>{
    let newContact = Contact({
        'Name': req.body.Name,
        "PNumber": req.body.PNumber,
        "Email": req.body.Email
    });
    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh list
            res.redirect('/business-contact');
        }
    });
}

module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('business/update-contact', {title: 'Edit Contact', contact: contactToEdit, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        'Name': req.body.Name,
        "PNumber": req.body.PNumber,
        "Email": req.body.Email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            res.redirect('/business-contact')
        }
    });
}

module.exports.processDeletePage = (req, res, next) =>{
    let id = req.params.id;

    Contact.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            res.redirect('/business-contact')
        }
    })
}