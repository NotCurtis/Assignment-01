var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
    page_des: "my mission"
    
  });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',
  page_des: "my mission"
  });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About',
  page_des: "me"
});
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects',
  page_des: "my projects"
});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services',
  page_des: "special services"
});
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact',
  page_des: "how to contact me"
});
});

module.exports = router;
