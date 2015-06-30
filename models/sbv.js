'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	title: { type: String },
	created: { type: Date, default: Date.now }
};

var sbvSchema = new Schema(fields);

module.exports = mongoose.model('Sbv', sbvSchema);
