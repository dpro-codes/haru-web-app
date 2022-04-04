module.exports = async (req, res, next) => {
    // Save request parameters to variable
    let coursesArray = req.session.coursesNames;
    let newCourse = req.body.courseName;

    // Check if the course is already in the cart
    var courseExists = coursesArray.includes(newCourse);
    if (courseExists) {
        res.redirect('/'); // If it is, then do nothing and redirect
    } else {
        // If it's not, add course info to the current session
        req.session.priceTotal.push(parseInt(req.body.coursePrice));
        req.session.coursesNames.push(req.body.courseName);
        let courseObject = {courseName: req.body.courseName, coursePrice: req.body.coursePrice}
        req.session.courseList.push(courseObject);
        res.redirect('/');
    }
};
