'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var fields = {
	title: { type: String },
	created: { type: Date, default: Date.now },
    offer: {
        type: ObjectId,
        ref: 'Offer'
    }
};

var sbvSchema = new Schema(fields);

module.exports = mongoose.model('Sbv', sbvSchema);
