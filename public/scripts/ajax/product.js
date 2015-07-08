'use strict';

define([
    'jquery'
], function($){
    return {
        get: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/product/' + id
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/products'
            });
        },
        listByCategory: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/category/' + id + '/products'
            });
        },
        post: function(item){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/product',
                data: JSON.stringify({category: item.category, title: item.title()})
            });
        },
        put: function(item){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/product/' + item._id,
                data: JSON.stringify(item)
            });
        },
        'delete': function(item){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/product/' + item._id
            });
        }
    };
});
