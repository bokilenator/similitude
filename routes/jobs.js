// routes file for jobs

// var person_model = require("../models/person.js");
// var person = new person_model;

// different routes we can have
exports.init = function(app) {
    app.get("/job/company", search_company);

}

var request = require('request');


// new plan form
search_company = function (req, res) {
	search = req.query.search;
	search = search.replace(" ", "%20");
	link = `http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=232147&t.k=ilUHPG5J1FO&action=employers&q=${search}`;
	console.log(link);
	var results;

// Found here: http://mherman.org/blog/2013/10/20/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/#.WjH490pKuM8
	// request module is used to process the yql url and return the results in JSON format
	request(link, function(err, resp, body) {
	  body = JSON.parse(body);
	  // logic used to compare search results with the input from user
	  console.log('error:', err); // Print the error if one occurred and handle it
	  console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
	  console.log(body);
	 // pass back the results to client side
	  res.send(body.response.employers);
	});

}
