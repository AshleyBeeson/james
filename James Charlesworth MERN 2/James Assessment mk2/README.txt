James Charlesworth's Issue Tracker Assessment
This application uses the MERN stack and will require some set up to run

code to type will be written as:     # code here #


1. Installs
Install nodejs
Install mongodb
Create a directory path at C://data/db
go to computer>change settings>advanced>environment variables and add the path to mongo


2.Compilation
within a node cmd or windows cmd, navigate to the root directory of the application
# npm install # this will install server side node modules
# cd client # to enter the client side of the applcation
# npm install # this will install client side node modules
# cd .. # back to root directory
in gulpFile.js a file path to the root directory will need to be changed in development builds if scss is wanting to be used


3.Startup
within a shell navigate to the mongodb install folder and cd into the bin folder a few more levels down
# mongod.exe # this starts the mongodb server (minimise this and leave it to do it's thing)

data will need to be added to the data base if no mongooseSchema.js file exists in the application root directory
either use a GUI ie. Robo 3T or run the command line interface to add the neccessary data following the preset schema
if a mongooseSchema.js file exists run # node mongooseSchema.js # from the earlier cmd prompt then # ^c # (cntrl + 'c')

finally start up the application using # npm start #
the site should automatically open in your default browser, if it doesn't, got to http://localhost:8080
the server and client are now running synchronously on ports 8080 and 8081.

4.Using the application
the application is a simple bug tracking tool that should be simple enough to use. You can filter issues by their progress, search though issues with a search bar,
edit the contents of an issue, view actions performed etc.

5.Testing
To run tests, # npm test # from the root directory of the application
(will likely error due to duplicate modules - if so, only fix is to re-install karma, jasmine, webpack, and dependencies on client side but database pull can no longer be tested)

Outstanding changes
- sort by column headings error (certain orders of operation yield incorrect results, hard to replicate reliably)
- getting edited issues to the database not functioning (unhandled promise rejection warning, altered field must be an array but is type String in document)
- add new action to existing document (will produce same error as above)
- site styling needs applying (mdl likely)
- validation on form entry only checks for fields not being null, does not check data type for specific fields (attempts at validation ignored severity and highPriority fields)
- testing (karma/jasmine)(Done for a few components and the flux stores filter, search and sorts functionality)