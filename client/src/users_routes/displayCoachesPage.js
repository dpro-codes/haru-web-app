const haruDB = require('../../../server/haruDB.js');
const Coach = haruDB.getCoachesModel();

module.exports = async (req, res ,next) => {
    let firstName = req.user.firstName;
    let userID = req.user.id;

    let coaches = await Coach.find({});

    let coachesData = coaches.map( emp => {
        let certificationNames =  emp.certifications.map(function(elem){return elem.courseName;}).join(' / ');
        return {
            id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            emailAddress: emp.emailAddress,
            certifications: certificationNames
        }
    });

    // console.log(coachesData);

    res.render('coachesPageView',
    {data:coachesData, 
        userID: userID, 
        firstName: firstName
    });
}
