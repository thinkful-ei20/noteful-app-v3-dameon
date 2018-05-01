'use strict';

exports.PORT = process.env.PORT || 8080;
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/noteful-app' || 'mongodb://dev:dev@ds111050.mlab.com:11050/noteful-app';