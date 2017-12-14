// define controller routes
exports.init = function(app) {
    app.get('/', index);
    app.get('/success', success);
}

// standard index page
index = function(req, res) {
    res.render('index');
}

success = function(req, res) {
    res.render('success');
}