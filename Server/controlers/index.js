let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req, res, next)  => {
    if(!req.user) {res.redirect('/login');}
    res.render('index', {title: 'Home', page_des: "my mission", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next)  => {
    if(!req.user) {res.redirect('/login');}
    res.render('index', {title: 'About', page_des: "me", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next)  => {
    if(!req.user) {res.redirect('/login');}
    res.render('index', {title: 'Projects', page_des: "my projects", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next)  => {
    if(!req.user) {res.redirect('/login');}
    res.render('index', {title: 'Services', page_des: "special services", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next)  => {
    if(!req.user) {res.redirect('/login');}
    res.render('contact', {title: 'Contact', page_des: "how to contact me", displayName: req.user ? req.user.displayName : ''});
}


module.exports.displayLoginPage = (req, res, next) =>{
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect("/");
    }
}

module.exports.processLoginPage = (req, res, next) =>{
    passport.authenticate('local',
    (err,user, info) =>{
        if(err)
        {
            return next(err);
        }
        
        if(!user)
        {
            req.flash('loginMessage', "authentication Error");
            return res.redirect('/login');
        }
        req.login(user, (err) =>{
            if(err)
            {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    if(!req.user)
    {
        res.render("auth/register",
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>{
    // instantiate a user obj
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log('Error: Inserting New User');
            if(err,name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'register Error: User Aleady Exists!'
                );
                console.log('User Aleady Exists!')
            }
            return res.render('auth/register', {
                title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no err exist

            // redrict the user and auth

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            })
        }
    });
}

module.exports.processLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
    console.log("Logged out")
}