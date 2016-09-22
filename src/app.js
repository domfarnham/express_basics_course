'use strict';
// Use express
var express = require('express'),
	// Use this json file
	  posts = require('./mock/posts.json');
// Turn posts.jon object's keys into an array of objects
var postsLists = Object.keys(posts).map(function(value) {
									return posts[value]})
// Variable to hold express library
var app = express();
// express.static is Middleware - the logic that tells Express how to handle 
// a request in between the time a request is made by the client, but
// before it arrives at a route.
app.use('/static', express.static(__dirname + '/public'));
// Sets view engine to Jade
app.set('view engine', 'jade');
// Specifies the directory where the templates(views) are stored
app.set('views', __dirname + '/templates');
// Router for the index page, specifies what the paticular request looks like
// and how to respond 
app.get('/', function(req, res){
	// Put the requested path into a variable
	var path = req.path;
	// Passes the path variable to the index.jade template
	// Works the same as res.render('index', {path: path});
	res.locals.path = path;
	// Uses render method to present the Jade template
	res.render('index');
});
// Router for the blog page, specifies what the paticular request looks like
// and how to respond 
app.get('/blog/:title?', function(req, res){ 
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render("blog", {posts: postsLists}); //Passes the posts variable to the blog.jade template
	} else {
		var post = posts[title] || {}; // posts[title] or underfined
		// Uses render method to present the Jade template 
		res.render('post', { post: post});
	}
});
// Router for the posts API
app.get('/posts', function(req, res) {
	// If request has a query on the end /posts?raw=true
	if (req.query.raw) {
		// Serve raw json file
		res.json(posts);
		// Else serve the array
	} else {
		res.json(postsLists);
	}
});
// server
app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});
