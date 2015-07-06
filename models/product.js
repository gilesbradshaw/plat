'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {
    category: { type: String },
	title: { type: String },
	created: { type: Date, default: Date.now }
};

var schema = new Schema(fields);

module.exports = mongoose.model('Product', schema);
