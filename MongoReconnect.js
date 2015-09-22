/**
 * Created by Amit Thakkar on 9/21/15.
 */
(function (require) {
    'use strict';
    var mongoose = require('mongoose');
    var mongoURL = 'mongodb://localhost/test';
    var db;
    var reconnectTimeout = 5000;
    var connectWithRetry = function (cb) {
        mongoose.connect(mongoURL, function (error) {
            if (error) {
                db.close();
                console.error('Failed to connect to MongoDB on startup', error);
            } else {
                console.info('Connected with MongoDB Server');
            }
        });
        db = mongoose.connection;
        cb && cb();
    };
    connectWithRetry(function () {
        db.on('error', function (error) {
            console.error('Mongoose Error: ', error);
        });
        db.on('connected', function () {
            console.info('Mongoose Connected to ', mongoURL);
        });
        db.once('open', function () {
            console.info('Mongoose Connection Open with MongoDB Server on ', mongoURL);
        });
        db.on('disconnected', function () {
            console.info('Mongoose connection disconnected');
            setTimeout(connectWithRetry, reconnectTimeout);
        });
    });
})(require);