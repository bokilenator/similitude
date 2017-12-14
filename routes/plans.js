// routes file for plans

// include the plan model
var planModel = require("../models/plans.js");


// different routes we can have
exports.init = function(app) {
    app.get("/plan/new", new_plan);
    app.put("/plan/new/:name/:pay/:id", create_plan);
    app.get('/plan', retrieve_plans);
    app.get('/choose', choose_plans);
    app.get('/compare/:left/:right', compare_plans);
    // app.get('/plan/:name', retrieve_plan);
    // app.delete('/plan/:name', delete_plan);


}

// new plan form
new_plan = function (req, res) {
    res.render('new_plan', {notice: ""});
}

create_plan = function (req, res) {
	[name, pay, id] = [req.params.name, req.params.pay, req.params.id];
	console.log([name, pay, id]);
	planModel.create_plan(name, pay, id, function(result) {
		// var success = (result ? "Created Plan successfully!" : "Plan name already exists, please choose another...");
		console.log(result);
		if (result == true) {
			console.log('here, in first');
			res.render('index', {notice: "Created Plan Successfully!"} )
		} else {
			console.log('here, in else');
			res.status(500).send('Plan name already exists, please choose another.')
		};
	});
}

// Get all the plans from the collection
retrieve_plans = function(req, res) {
    planModel.retrieve_plans(function(result) {
        res.send(result);
        console.log(result)
    });
}

// Choose the two plans to compare
choose_plans = function(req, res) {
    res.render('choose');
}

// Compare the two plans selected by choose
compare_plans = function(req, res) {
    [left, right] = [req.params.left, req.params.right];
    // retrieve plan from mongo, is asynchronous
    planModel.retrieve_plan(left, function(left_result) {
        console.log(left_result);
        planModel.retrieve_plan(right, function(right_result) {
            res.render('comparison', {left_plan: left_result[0], right_plan: right_result[0]});
        })
    })
}

// Get a specific plan
retrieve_plan = function(req, res) {
    name = req.params.name;
    planModel.retrieve_plan(name, function(result) {
        res.render('plans', {title: "Plan", obj: result});
    });
}


// Delete a specific plan
delete_plan = function(req, res) {
    name = req.params.name;
    planModel.delete_plan(name, function(result) {
        if (result) {
            res.render('message', {title: "Delete Plan", obj: "Successfully deleted plan"});
        } else {
            res.render('message', {title: "Delete Plan", obj: "Failed to delete plan"});
        }
    })
}