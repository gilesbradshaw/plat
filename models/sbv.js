'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {
	title: { type: String },
	created: { type: Date, default: Date.now }
};

var sbvSchema = new Schema(fields);

module.exports = mongoose.model('Sbv', sbvSchema);
