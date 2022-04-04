const haruDB = require('../../../server/haruDB.js');
const Course = haruDB.getCoursesModel();

module.exports = async (req, res ,next) => {
    let firstName = req.user.firstName;
    let userID = req.user.id;

    let courses = await Course.find({});

    let coursesData = courses.map( emp => {
        priceFormatted = (emp.coursePrice).toFixed(2);
        return {
            courseID: emp._id,
            courseName: emp.courseName,
            courseDescription: emp.courseDescription,
            courseInstructor: emp.courseInstructor,
            coursePrice: priceFormatted,
            courseVideo: emp.courseVideo
        }
    });

    if (req.session.courseList === undefined) {
        req.session.courseList = [];
    }
    if (req.session.coursesNames === undefined) {
        req.session.coursesNames = [];
    }
    if (req.session.priceTotal === undefined) {
        req.session.priceTotal = [];
    }

    if (req.session.priceTotal === []){
        res.render('displayStoreView',
        {data:coursesData, 
            userID: userID, 
            firstName: firstName, 
            courseList: req.session.courseList,
        });
    } else {
        let priceSum = req.session.priceTotal.reduce((a, b) => a + b, 0);
        res.render('displayStoreView',
        {data:coursesData, 
            userID: userID, 
            firstName: firstName, 
            courseList: req.session.courseList,
            courseNames: req.session.courseNames,
            priceTotal: priceSum.toFixed(2)
        });

    }
     
};
