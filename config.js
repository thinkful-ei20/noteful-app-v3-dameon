'use strict';

exports.PORT = process.env.PORT || 8080;
exports.MONGODB_URI = process.env.MONGODB_URI ||  'mongodb://localhost/noteful-app'||'mongodb://dev:dev@ds111050.mlab.com:11050/noteful-app';
exports.TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-app-test'||'mongodb://dev:dev@ds111430.mlab.com:11430/noteful-test';
//extra
//'mongodb://localhost/noteful-app' ||   