'use strict';
//headings view model - fetches headings for products - what each row represents.

define([
    'jquery'
], function($){
    return {
        get: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/enquiry/' + id
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/enquiries'
            });
        },
        listByDealer: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/dealer/' + id + '/enquiries'
            });
        },
        post: function(item){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/enquiry',
                data: JSON.stringify({dealer: item.dealer, title: item.title()})
            });
        },
        put: function(item){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/enquiry/' + item._id,
                data: JSON.stringify(item)
            });
        },
        'delete': function(item){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/enquiry/' + item._id
            });
        }
    };
});
