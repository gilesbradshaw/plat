'use strict';

define([
    'jquery'
], function($){
    return {
        get: function(id){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/dealer/' + id
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/dealers'
            });
        },
        post: function(item){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/dealer',
                data: JSON.stringify({title: item.title()})
            });
        },
        put: function(item){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/dealer/' + item._id,
                data: JSON.stringify(item)
            });
        },
        'delete': function(item){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/dealer/' + item._id
            });
        }
    };
});
