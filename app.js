var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var imageDirectory = process.argv[2] ? process.argv[2] : path.join(__dirname, 'images')

app.use('/', routes);

fs.readdir(imageDirectory ,function(err,files){
    if(err) {
        console.log('ERROR - Unable to read from '+imageDirectory);
        process.exit(1);
    }
    var images = [];
    files.forEach(function(file){
        var exts = ['.jpg', '.png', '.gif'];
        for (var i=0; i < exts.length; i++) {
            if(file.indexOf(exts[i], file.length - exts[i].length) !== -1) {
                images.push(file);
                continue;
            }
        }
    });
    registerSockets(images);
});

function registerSockets(images) {
    var currentImage = 0;

    io.on('connection', function(socket){
        console.log('New connection from', socket.request.headers.host, socket.request.headers['user-agent']);
        socket.emit('image', images[currentImage]);

        socket.on('next-image', function() {
            currentImage++;
            if (currentImage === images.length) {
                currentImage = 0;
            }
            io.emit('image', images[currentImage]);
        });
        socket.on('previous-image', function() {
            currentImage--;
            if (currentImage < 0) {
                currentImage = images.length - 1;
            }
            io.emit('image', images[currentImage]);
        });
    });
}

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(imageDirectory));
console.log('Serving images from ' + imageDirectory);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

server.listen(3000)
console.log('Listening on port ' + server.address().port);
