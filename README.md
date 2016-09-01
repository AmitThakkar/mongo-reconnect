# MongoDB Reconnect

This is a demo repository which shows how to reconnect with MongoDB Server with NodeJS.

**MongooseJS** has awesome `event handling`. With the help of `disconnect` event, we will get know that connection has 
broken with **MongoDB Server** so we can try to reconnect with **MongoDB**. Below is the sample/demo app, which will try
to reconnect with(Here we capture **MongoDB** `disconnect` event and try to reconnect with) **MongoDB**. And as soon as
MongoDB Server will up again, it will automatically connect to **MongoDB** without restarting the **NodeJS** Server.

```JavaScript
/**
 * Created by Amit Thakkar on 9/21/15.
 */
(function (require) {
    'use strict';
    var mongoose = require('mongoose');
    var mongoURL = 'mongodb://localhost/test';
    var db;
    var reconnectTimeout = 5000;
    var connectWithRetry = function(cb) {
        mongoose.connect(mongoURL, function(error) {
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
    connectWithRetry(function() {
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
```

> Reconnect interval is 5sec here.

Follow Me
---
[Github](https://github.com/AmitThakkar)

[Twitter](https://twitter.com/amit_thakkar01)

[LinkedIn](https://in.linkedin.com/in/amitthakkar01)

[More Blogs By Me](https://amitthakkar.github.io/)