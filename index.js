const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const configuration = require('./config');

const path = require("path");


// Initilize Express app
const app = express();

// Define user serialization and deserialization
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// configure LDAP Auth here. Include these 5 options: url, bindDn, bindCredentials, searchBase, searchFilter.
//  'searchFilter' filters by 'sAMAccountName'.
passport.use(new LdapStrategy(configuration));

// Configure view engine to render EJS templates.
app.set("views", __dirname + "\\views");
app.set("view engine", "ejs");

// 5. Configure app level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));


app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname+'/views/home.html'));
});


app.post('/login', passport.authenticate('ldapauth', {session: true, successRedirect: '/profile' , failureRedirect: '/', }), function (req, res){
});


app.get('/profile', function(req, res){
	res.render('profile', {
		name: req.user.name,
		company: req.user.company,
		organization: req.user.organization,
		department: req.user.department,
		title: req.user.title,
		description: req.user.description,
		telephoneNumber: req.user.telephoneNumber,
		mail: req.user.mail,
		physicalDeliveryOfficeName: req.user.physicalDeliveryOfficeName,
		physicalDeliveryOfficeAddress: req.user.physicalDeliveryOfficeAddress
	});
});

//app listen on port 8081.
const port = 8081;
app.listen(port, function() {
	console.log(`listening on ${port}`);
});
