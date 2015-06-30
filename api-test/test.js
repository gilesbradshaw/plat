'use strict';

process.env.NODE_ENV = 'test';

var app = require('../app.js');

require('./post/test-post.js')(app);
require('./post/test-sbv.js')(app);
