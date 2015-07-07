'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var fields = {
    category: { type: String },
	title: { type: String },
	created: { type: Date, default: Date.now },
    dealer: {
        type: ObjectId,
        ref: 'Category'
    }
};

var schema = new Schema(fields);

module.exports = mongoose.model('Product', schema);
