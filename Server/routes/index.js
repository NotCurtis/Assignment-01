let express = require('express');
let router = express.Router();

let indexController = require("../controlers/index");


/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home',  indexController.displayHomePage,);

/* GET About page. */
router.get('/about',  indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

// GET route for  displaying the Login page
router.get('/login', indexController.displayLoginPage);

// GET route for processing the Login page
router.post('/login', indexController.processLoginPage);

// GET route for  displaying the Register page 
router.get('/register', indexController.displayRegisterPage);

// GET route for processing the Register page
router.post('/register', indexController.processRegisterPage);

// GET route for processing the Logout page
router.get('/logout', indexController.processLogout);

module.exports = router;
