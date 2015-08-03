var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('client', { title: 'Express Gallery' });
});

router.get('/control', function(req, res) {
    res.render('control', { title: 'Express Gallery' });
});

module.exports = router;
