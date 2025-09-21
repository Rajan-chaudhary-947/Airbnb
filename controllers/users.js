const User = require("../models/user");

// Controller function for rendering the signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Controller function for handling user signup
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Airbnb!");
            res.redirect("/listings");
        });  
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};

// Controller function for rendering the login form
module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

// Controller function for handling user login
module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Airbnb!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Controller function for handling user logout
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};