const haruDB = require('./haruDB.js');
const Coach = haruDB.getCoachesModel();
const Course = haruDB.getCoursesModel();
const User = haruDB.getUsersModel();

(async() => {
	await User.deleteMany({});
	let user1 = new User({role: 'Admin', firstName:'Diana',lastName:'Ruiz',emailAddress: 'diana@haru.mx',password:'sesame', coursesPurchased: [{courseName:'BodyPump'}]}); 
	let user2 = new User({role: 'User', firstName:'John',lastName:'W',emailAddress: 'john@haru.mx',password:'sesame', coursesPurchased: {courseName:'BodyPump'}}); 
	let user3 = new User({role: 'User', firstName:'Suresh',lastName:'K',emailAddress: 'suresh@haru.mx',password:'sesame', coursesPurchased: []});  

	await Promise.all([user1.save(), user2.save(), user3.save()]);
	let currentUsers = await User.find({});
	console.log(currentUsers);

	await Coach.deleteMany({});
	let coach1 = new Coach({firstName:'Iron',lastName:'Ruiz',emailAddress: 'iron@haru.mx',certifications: [{courseName:'BodyCombat'}]}); 
	let coach2 = new Coach({firstName:'Rojo',lastName:'H.',emailAddress: 'rojo@haru.mx',certifications: [{courseName:'BodyPump'}]}); 
	let coach3 = new Coach({firstName:'Ingrid',lastName:'H.',emailAddress: 'ingrid@haru.mx',certifications: [{courseName:'BodyCombat'},{courseName:'BodyAttack'}]}); 
	let coach4 = new Coach({firstName:'Alex',lastName:'de la Vega',emailAddress: 'alex@haru.mx',certifications: [{courseName:'BodyBalance'}]}); 

	await Promise.all([coach1.save(), coach2.save(), coach3.save(),	coach4.save()]);
	let currentCoaches = await Coach.find({});
	console.log(currentCoaches);

	await Course.deleteMany({});
	let course1 = new Course({courseName:'BodyPump', courseDescription:'A fast-paced, barbell-based workout that is specifically designed to help you get lean, toned and fit.',courseInstructor: 'Rojo H.', coursePrice: 25.00, courseVideos: 'https://www.youtube.com/embed/ioGhcD4sR6I'}); 
	let course2 = new Course({courseName:'BodyCombat',courseDescription:'A high-energy martial arts-inspired workout that is totally non-contact. Punch and kick your way to fitness!',courseInstructor: 'Rojo H.', coursePrice: 25.00, courseVideos: 'https://www.youtube.com/embed/xbABGepKT2o'}); 
	let course3 = new Course({courseName:'BodyBalance',courseDescription:'A yoga-based class that will improve your mind, your body and your life.',courseInstructor: 'Rojo H.', coursePrice:25.00, courseVideos: 'https://www.youtube.com/embed/HKDnIUEJ7Vc'}); 
	let course4 = new Course({courseName:'BodyAttack',courseDescription:'A high-energy fitness class that combines athletic movements like running, lunging and jumping with strength exercises such as push-ups and squats.',courseInstructor: 'Rojo', coursePrice: 25.00, courseVideos: 'https://www.youtube.com/embed/0Q8LYWbH-Qw'});
	let course5 = new Course({courseName:'CXWorks',courseDescription:'A 30-minute core-training workout that uses your body weight, resistance tubing and weights to tighten and tone your midsection.',courseInstructor: 'Ingrid', coursePrice: 25.00, courseVideos: 'https://www.youtube.com/embed/llYRi9EihBI'}); 
	
	await Promise.all([course1.save(), course2.save(), course3.save(), course4.save(), course5.save()]);
	let currentCourses = await Course.find({});
	console.log(currentCourses);
	
	process.exit();
})();














