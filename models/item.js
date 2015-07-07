'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {
    title: { type: String },
	created: { type: Date, default: Date.now },
    product:
        {
            type: ObjectId,
            ref: 'Product'
        }
};

var schema = new Schema(fields);

module.exports = mongoose.model('Item', schema);
