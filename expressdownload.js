var fs = require('fs');
var express = require('express');
var app = express();

app.get('/:name', function(req, res) {
        var file = __dirname + '/test/' + req.params.name;
        fs.exists(file, function(exists) {
                if (exists) {
                        res.download(file);
                        console.log('download file = ', file);
                } else {
                        res.sendStatus(404);
                        console.log('can\'t find file = ', file);
                }
        });
});

app.listen(80);
