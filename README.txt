CS602 - Server-Side Web Development
Final Project: Haru Fitness Mexico - Video Streaming Website 
Author: Diana Ruiz-Olvera
Date: August 20, 2020

To start the application, using the command line navigate to the folder called "haru" and run: nodemon server.js
The configuration uses http://localhost:3000/. This will ensure the AJAX functionality on the API page works correctly.

Once the server is running, you can navigate to http://localhost:3000/register to create an account. Upon account creation,
you will be redirected to http://localhost:3000/login. Before you enter you account credentials in the login page, 
you will need to restart the server. This will update the users collection in the database with your newly created account. 
Then, you will be able to enter your credentials and access the rest of the site.

You can also login into http://localhost:3000/admin/login and use them same credentials to explore the Admin functionality.

I did include an initDB.js file but I did not had a chance to run a final test with it. 
I recommend only using it as a reference if you require dummy data. 
The three database collections do have some data in there already. 
You should be able to modify most of the existing the data using the application. Yay!

That's it. Thank you, John!

-----------------------------
Run npm install for both part1 and part2 to install the node dependency modules.

Complete the missing functionality for part1 and part2

Part2 Modifications:

 1) employeeDB.js  - Fill in the schema definition for firstName and lastName

 2) Populate initial data to your collection by running
        node initDB.js

 3) hw3_routes  - Fill in the code for the following
       addEmployee.js  (render addEmployeeView)
       saveEmpoyee.js  (save the employee to the database)
       deleteEmployee.js  (Find the employee by id and render the deleteEmployeeView for confirmation)
       deleteEmployeeAfterConfirm.js (Find the employee by id, remove from the database, and redirect to /employees)
       editEmployee.js (Find the employee by id and render the editEmployeeView with form populated with the current values)
       saveAfterEdit.js (Find the employee by id, change the employee's properties with the new values, save to the database, and redirect to /employees
