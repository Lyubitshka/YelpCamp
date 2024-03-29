const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res) => {
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
}

module.exports.renderLogin = (req, res) => {
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

module.exports.login = (req, res) => {
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    const redirectUrl = res.locals.redirectTo || '/campgrounds';
    // delete res.locals.redirectUrl;
    req.flash('success', 'Welcome back!');
    res.redirect(redirectUrl);
}

module.exports.logout = async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
    });
}