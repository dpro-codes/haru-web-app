const mongoose = require('mongoose');
require('dotenv').config()
const dbUrl = 'mongodb+srv://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@cluster0.k9tky.mongodb.net/harudb?retryWrites=true&w=majority';


let connection = null;
let userModel = null;
let coachModel = null;
let courseModel = null;
let Schema = mongoose.Schema;

// Fill in the schema definition
let usersSchema = new Schema({
	id: String,
	role: String,
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String,
	coursesPurchased: [{courseName: String}]
}, {collection: 'users'});

let coachesSchema = new Schema({
	id: String,
	firstName: String,
	lastName: String,
	emailAddress: String,
	certifications: [{id: String, courseName: String}]
}, {collection: 'coaches'});

let coursesSchema = new Schema({
	id: String,
	courseName: String,
	courseDescription: String,
	courseInstructor: String,
	coursePrice: Number,
	courseVideo: String
}, {collection: 'courses'});

module.exports = {
	getUsersModel: () => {
		if (connection == null) {
			console.log("Creating connection...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			userModel = connection.model("UserModel", usersSchema);
			return userModel;
		} else {
			userModel = connection.model("UserModel", usersSchema);
			return userModel;
		}
	},
	getCoachesModel: () => {
		if (connection == null) {
			console.log("Creating connection...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			coachModel = connection.model("CoachModel", coachesSchema);
			return coachModel;
		} else {
			coachModel = connection.model("CoachModel", coachesSchema);
			return coachModel;
		}
	},
	getCoursesModel: () => {
		if (connection == null) {
			console.log("Creating connection...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			courseModel = connection.model("CourseModel", coursesSchema);
			return courseModel;
		} else {
			courseModel = connection.model("CourseModel", coursesSchema); 
			return courseModel;
		}
	}
};