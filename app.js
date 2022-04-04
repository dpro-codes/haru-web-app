const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const getUsers = require('./client/src/users_routes/getUsers');
const path = require('path');
require('dotenv').config()

const app = express();

// Handlebars View Engine
const hbs = handlebars.create({ defaultLayout:'main_logo' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './client/views'));

// Static Resources
app.use(express.static('./client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: process.env.COOKIESECRET,
  resave: false,
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Gets all users from the database to compare against login credentials
var users;
getUsers.DBusers().then(values => {
  users = values; console.log(users);
})
const initializePassport = require('./client/src/users_routes/passport-config');
initializePassport(
    passport, 
    email => users.find(user => user.emailAddress === email)
);

// Routing
var app_routes = require('./index');
app.use('/', app_routes);
app.use('/api', app_routes);
app.use('/login', app_routes);
app.use('/logout', app_routes)
app.use('/admin', app_routes);
app.use('/admin/coaches', app_routes);
app.use('/admin/courses', app_routes);


app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('http://localhost:3000');
});
