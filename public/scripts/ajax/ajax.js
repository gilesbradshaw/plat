'use strict';

define([
    'jquery',
    'ajax.sbv',
    'ajax.enquiry',
    'ajax.sales-exec',
    'ajax.dealer'
], function($, sbv, enquiry, salesExec, dealer){
    return {
        enquiry: enquiry,
        sbv: sbv,
        salesExec: salesExec,
        dealer: dealer,
        headings: {
            post: function(){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    url: '/headings'
                });

            }
        },
        products: {
            post: function(product){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(product),
                    url: 'api/products'
                });
            }
        },
        product: {
            post: function(product){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(product),
                    url: 'api/product'
                });
            }
        },
        parameters: {
            list: function(product){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({title: 'parammmmmm'}),
                    url: 'api/parameters/' + product._id
                }).then(function (){
                    return $.ajax({
                        method: 'GET',
                        contentType: 'application/json',
                        url: 'api/parameters/' + product._id
                    });
                });
            }
        }
    };
});
