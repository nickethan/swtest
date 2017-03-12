var express = require('express'),
    app = express(),
    routes = require('./routes');

app.set('view engine', 'ejs');

app.use(routes);

app.use(function (err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
});

app.listen(3000, function () {
    console.log('Server Running on Port 3000')
});
