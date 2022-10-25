const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

const { checkReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    try{ 
        const {email, username, password } = req.body;
        const user = new User({email , username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err) return nexr(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
    });
});

module.exports = router;