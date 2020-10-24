let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactControler = require('../controlers/contact');

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
router.get('/', contactControler.displayContactList);

// GET route for  displaying the Add page - CREATE
router.get('/add', requireAuth, contactControler.displayAddPage);

// GET route for processing the Add page - CREATE
router.post('/add', requireAuth, contactControler.processAddPage);

// GET route for  displaying the Edit page - UPDATE
router.get('/edit/:id', requireAuth, contactControler.displayEditPage);

// GET route for processing the Edit page - UPDATE
router.post('/edit/:id', requireAuth, contactControler.processEditPage);

// GET te perform Delete page - DELETE
router.get('/delete/:id', requireAuth, contactControler.processDeletePage);

module.exports = router;