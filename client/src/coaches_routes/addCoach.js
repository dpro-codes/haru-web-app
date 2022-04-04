module.exports = (req , res , next) => {
		
		// Renders view with fields to add new Coach
		res.render('addCoachView',      
		{title:"Add a New Coach", layout: 'admin_platform_layout'});

};
