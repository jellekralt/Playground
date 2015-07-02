var express = require('express');

var app = express();

app.set('views', __dirname);

function processCall(req, res) {
    console.log(  typeof req.session.reqCount  );
    if(typeof req.session.reqCount === 'undefined') {
        console.log('yo');
        req.session.reqCount = 0;
    }
    console.log(  typeof req.session.reqCount  );
    console.log('Received request', req.session.reqCount);

    req.session.reqCount++;

    req.session.save(function() {
        setTimeout(function() {

            res.render('result', {
                reqCount: req.session.reqCount
            });

        }, 5000);


    });

}

/* Post test */
app.post("/result", processCall);

/* Get test */
app.get("/result", processCall);

app.get('/', function(req, res) {
    req.session.reqCount = 0;

    res.render('index');
});

module.exports = app;