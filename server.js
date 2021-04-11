require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')


const app = express();

require('./config/passport-local')(passport);


// db.sequelize.sync();

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))

app.use(
    session({
        secret: 'shhhhhhhhhhhh',
        resave: true,
        saveUninitialized: true
    })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use('/auth', require('./routes/auth-gh'))
app.use('/api/gigs', require('./routes/gigs'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
