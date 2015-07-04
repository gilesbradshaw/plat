'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
    category: { type: String },
	title: { type: String },
	created: { type: Date, default: Date.now }
};

var productSchema = new Schema(fields);

module.exports = mongoose.model('Product', productSchema);
