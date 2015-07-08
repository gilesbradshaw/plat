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
                url: '/api/sales-exec/' + id
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/sales-execs'
            });
        },
        listByDealer: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/dealer/' + id + '/sales-execs'
            });
        },
        post: function(item){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/sales-exec',
                data: JSON.stringify({dealer: item.dealer, title: item.title()})
            });
        },
        put: function(item){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/sales-exec/' + item._id,
                data: JSON.stringify(item)
            });
        },
        'delete': function(item){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/sales-exec/' + item._id
            });
        }
    };
});
