'use strict';

define([
    'jquery'
], function($){
    return {
        get: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/item/' + id
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/items'
            });
        },
        listByProduct: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/product/' + id + '/items'
            });
        },
        post: function(item){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/item',
                data: JSON.stringify(item)
            });
        },
        put: function(item){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/item/' + item._id,
                data: JSON.stringify(item)
            });
        },
        'delete': function(item){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/item/' + item._id
            });
        }
    };
});
