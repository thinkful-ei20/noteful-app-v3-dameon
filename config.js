'use strict';

exports.PORT = process.env.PORT || 8080;
exports.MONGODB_URI = process.env.MONGODB_URI ||  'mongodb://dev:dev@ds111050.mlab.com:11050/noteful-app';
exports.TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://dev:dev@ds111050.mlab.com:11050/noteful-app';
//extra
//'mongodb://localhost/noteful-app' ||  