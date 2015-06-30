var express = require('express');
var swig = require('swig');
var path = require('path');
var fs = require('fs');

var experimentPath = path.join(__dirname, 'experiments');
var experiments = fs.readdirSync(experimentPath);

var app = express();

// View engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname);

// Index
app.get('/', function (req, res) {
    res.render('index', {
    	experiments: experiments
    });
});

// HTML templates
app.get('*.html', function(req, res) {
	res.render(req.params[0].slice(1) + '.html');
});

experiments.forEach(function(experiment) {
    try {
        app.use('/' + experiment, require('./experiments/' + experiment));
    } catch(err) {
        console.log('Experiment "' + experiment + '" has no node module');
    }
});

app.use(express.static(__dirname + '/experiments'));

var server = app.listen(4000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Playground running on http://%s:%s', host, port);

});