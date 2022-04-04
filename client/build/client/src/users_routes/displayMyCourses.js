const haruDB = require('../../../server/haruDB.js');
const User = haruDB.getUsersModel();
const Course = haruDB.getCoursesModel();

module.exports.purchaseCourses = async (req, res ,next) => {
    // Save Request Parameters to variables
    let userID = req.user.userID;
    let coursesArray = req.session.coursesNames;

    await User.findById(userID, (err, user) => {
        // Error and undefined entries handlers
        if(err)
          console.log("Error Selecting : %s ", err); 
        if (!user)
          return res.render('404');
        //  Checks if the courses in the cart were already purchased by the user
        let userCoursesPurchased = user.coursesPurchased;
        for (var courseName of coursesArray) {
            let courseExists = userCoursesPurchased.find(course => course.courseName === courseName);
            if (!courseExists) {
                // If not found in coursesPurchased, then it adds them
              user.coursesPurchased.push({courseName: courseName}); 
            };
        }
        // Saves to the database, and redirects to /mycourses
        user.save((err) => {
          if (err)
            console.log("Error updating : %s ",err );
        }); 
        res.redirect('/mycourses');
    })
}; 

module.exports.getMyCourses = async (req, res ,next) => {
    // Save Request Parameters to variables
    let firstName = req.user.firstName;
    let userID = req.user.userID;

    // Get User's data from the database using UserID
    let haruUser = await User.findById(userID);
    let courseNameArray = haruUser.coursesPurchased;
    let courseArray = [];
    for (var courses of courseNameArray) {
        // Get the data for courses purchased by the user
        let course = await Course.find({courseName: courses.courseName});
        courseArray.push(course);
    }
    let flatCourseArray = courseArray.reduce(
        ( accumulator, currentValue ) => accumulator.concat(currentValue),[]);

    let myCourses = (flatCourseArray).map( emp => {
    priceFormatted = (emp.coursePrice).toFixed(2);
    return {
        courseID: emp._id,
        courseName: emp.courseName,
        courseDescription: emp.courseDescription,
        courseInstructor: emp.courseInstructor,
        coursePrice: emp.priceFormatted,
        courseVideo: emp.courseVideo
    }});

    res.render('coursesPurchasedView',
    { userID: userID, 
        firstName: firstName, 
        courseName: courseNameArray,
        data: myCourses
    });
};
     
