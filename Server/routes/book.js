let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require("../controlers/book");

// helper function

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// GET route for the Book list page
router.get('/', bookController.displayBookList);

// GET route for  displaying the Add page - CREATE
router.get('/add', requireAuth, bookController.displayAddPage);

// GET route for processing the Add page - CREATE
router.post('/add', requireAuth, bookController.processAddPage);

// GET route for  displaying the Edit page - UPDATE
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

// GET route for processing the Edit page - UPDATE
router.post('/edit/:id', requireAuth, bookController.processEditPage);

// GET te perform Delete page - DELETE
router.get('/delete/:id', requireAuth, bookController.processDeletePage);

module.exports = router;