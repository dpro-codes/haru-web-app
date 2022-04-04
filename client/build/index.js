var express = require('express');
var router = express.Router();
const passport = require('passport');

// Login/Registration Modules & Routes
var saveUser = require("./client/src/users_routes/register");
router.get('/', checkAuthenticated, (req,res) => {res.redirect('/store')});
router.get('/register', checkNotAuthenticated,(req,res) => {res.render('register.handlebars')})
router.post('/register', checkNotAuthenticated,  saveUser);
router.get('/login', checkNotAuthenticated, (req,res) => {res.render('login.handlebars', {layout: 'main_logo_login'})})
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
}))
router.delete('/logout', (req, res) => {
  req.session.coursesNames = [];
  req.session.priceTotal = [];
  req.session.courseList = [];
  req.logOut()
  res.redirect('/login')
})

// Authentication Functions
function checkAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login');
}
function checkNotAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
      res.redirect('/');
  }
      next();
  }

// Store Modules & Routes
var displayStore = require("./client/src/users_routes/displayStore");
var shoppingCart = require("./client/src/users_routes/shoppingCart");
router.get('/store', checkAuthenticated, displayStore);
router.post('/store', checkAuthenticated, shoppingCart);

// Store Modules & Routes
var displayCoachesPage = require("./client/src/users_routes/displayCoachesPage");
var displayMyCourses = require("./client/src/users_routes/displayMyCourses");
router.get('/coaches', checkAuthenticated, displayCoachesPage); 
router.get('/mycourses', checkAuthenticated, displayMyCourses.getMyCourses);
router.post('/mycourses', checkAuthenticated, displayMyCourses.purchaseCourses);

// Admin Modules & Routes
var displayAdmin = require("./server/displayAdmin");
var displayUsers = require("./client/src/users_routes/displayUsers");
router.get('/admin/login', (req,res) => {res.render('loginAdmin.handlebars', {layout: 'admin_layout'})})
router.post('/admin/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true 
}))
router.delete('/admin/logout', (req, res) => {
req.logOut()
res.redirect('/admin/login')
})
router.get('/admin', checkAuthenticated, displayAdmin);
router.get('/admin/users', checkAuthenticated, displayUsers); 

// Courses Modules
var displayCourses = require("./client/src/courses_routes/displayCourses");
var addCourse = require("./client/src/courses_routes/addCourse");
var saveCourse = require("./client/src/courses_routes/saveCourse");
var editCourse = require("./client/src/courses_routes/editCourse");
var saveCourseAfterEdit	= require("./client/src/courses_routes/saveCourseAfterEdit");
var deleteCourse = require("./client/src/courses_routes/deleteCourse");
var deleteCourseAfterConfirm = require("./client/src/courses_routes/deleteCourseAfterConfirm");

// Courses Routes
router.get('/admin/courses', checkAuthenticated, displayCourses); 
router.get('/admin/courses/add', checkAuthenticated, addCourse);
router.post('/admin/courses/add', checkAuthenticated, saveCourse);
router.get('/admin/courses/edit/:id', checkAuthenticated, editCourse);
router.post('/admin/courses/edit', checkAuthenticated, saveCourseAfterEdit);
router.get('/admin/courses/delete/:id', checkAuthenticated, deleteCourse);
router.post('/admin/courses/delete', checkAuthenticated, deleteCourseAfterConfirm);

// Coaches Modules
var displayCoaches = require("./client/src/coaches_routes/displayCoaches");
var addCoach = require("./client/src/coaches_routes/addCoach");
var saveCoach = require("./client/src/coaches_routes/saveCoach");
var editCoach = require("./client/src/coaches_routes/editCoach");
var saveAfterEdit = require("./client/src/coaches_routes/saveAfterEdit");
var deleteCoach = require("./client/src/coaches_routes/deleteCoach");
var deleteCoachAfterConfirm = require("./client/src/coaches_routes/deleteCoachAfterConfirm");

// Coaches Routes
router.get('/admin/coaches', checkAuthenticated, displayCoaches); 
router.get('/admin/coaches/add', checkAuthenticated, addCoach);
router.post('/admin/coaches/add', checkAuthenticated, saveCoach);
router.get('/admin/coaches/edit/:id', checkAuthenticated, editCoach);
router.post('/admin/coaches/edit/', checkAuthenticated, saveAfterEdit);
router.get('/admin/coaches/delete/:id', checkAuthenticated, deleteCoach);
router.post('/admin/coaches/delete', checkAuthenticated, deleteCoachAfterConfirm);

// Rest API Routes & Module
var rest = require("./server/rest"); // API Module
router.get('/api', checkAuthenticated, rest.homeAPI);
router.get('/api/courses/json', checkAuthenticated, rest.coursesJSON);
router.get('/api/coaches/json', checkAuthenticated, rest.coachesJSON);
router.get('/api/users/json', checkAuthenticated, rest.usersJSON);
router.get('/api/courses/xml', checkAuthenticated, rest.coursesXML);
router.get('/api/coaches/xml', checkAuthenticated, rest.coachesXML);
router.get('/api/users/xml', checkAuthenticated, rest.usersXML);
router.post('/api/AJAXrequest', checkAuthenticated, rest.AJAXrequest);
router.get('/api/user/json/:emailAddress', checkAuthenticated, rest.userEmailJSON);
router.get('/api/user/xml/:emailAddress', checkAuthenticated, rest.userEmailXML);

module.exports = router;

