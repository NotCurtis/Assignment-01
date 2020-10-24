let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let Book = require("../models/book");



module.exports.displayBookList = (req, res, next) =>{
    if(!req.user) {res.redirect('/login');}
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(bookList);
            
            res.render('book/list', {title: 'Book List', BookList: bookList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) =>{
    res.render('book/add', {title: 'Add Book'});
} 

module.exports.processAddPage = (req, res, next) =>{
    let newBook = Book({
        'Name': req.body.Name,
        'Author':req.body.Author,
        'Date': req.body.Date,
        'Type': req.body.Type,
        'Price': req.body.Price
    });
    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            res.redirect('/book-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id;

    let updatedBook = Book({
        '_id': id,
        'Name': req.body.Name,
        'Author':req.body.Author,
        'Date': req.body.Date,
        'Type': req.body.Type,
        'Price': req.body.Price
    });

    Book.updateOne({_id: id}, updatedBook, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            res.redirect('/book-list')
        }
    });
}

module.exports.processDeletePage = (req, res, next) =>{
    let id = req.params.id;

    Book.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            res.redirect('/book-list')
        }
    })
}