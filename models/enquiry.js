'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var fields = {
	title: { type: String },
	created: { type: Date, default: Date.now },
    dealer: {
        type: ObjectId,
        ref: 'Dealer'
    }
};

var schema = new Schema(fields);

module.exports = mongoose.model('Enquiry', schema);
