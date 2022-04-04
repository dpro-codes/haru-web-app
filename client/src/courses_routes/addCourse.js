module.exports = (req , res , next) => {
		
		// Fill in the code

		// Renders view with fields to add new employee
		res.render('addCourseView',      
		{title:"Add a New Course", layout: 'admin_platform_layout'});

};
