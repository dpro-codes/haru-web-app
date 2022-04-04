const bcrypt = require('bcrypt');
const haruDB = require("../../../server/haruDB.js");
const User = haruDB.getUsersModel();
let DBrequestAPI = require("../../../server/DBrequestAPI");

module.exports = async (req , res , next) => {
    let email = req.body.email;
    await DBrequestAPI.getUsers().then(values => {
        haruUsers = values; 
        // console.log(haruUsers);
    });
    let emailTaken = haruUsers.find(user => user.emailAddress === email);
    
    if (emailTaken) {
        res.render('register', {failureMessage: "The email address already exists. Please use a different one."})
    } else { 
    // Creates new entry in the database using the input from the user for first and last name
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    let user = await new User ({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.email,
        password: hashedPassword
    })
    // Saves new user 
    user.save((err) => {
        if(err)
            console.log("Error : %s ",err);
        });
    res.render('login', {successMessage: "Success! You can now login."})
}};
