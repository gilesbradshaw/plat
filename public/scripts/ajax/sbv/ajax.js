'use strict';
//headings view model - fetches headings for products - what each row represents.

define([
    'jquery'
], function($){
    return {
        get: function(sbvid){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/sbv/' + sbvid
            });
        },
        list: function(){
            return $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/api/sbvs'
            });
        },
        post: function(sbv){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/sbv',
                data: JSON.stringify(sbv)
            });
        },
        put: function(sbv){
            return $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/sbv/' + sbv._id,
                data: JSON.stringify(sbv)
            });
        },
        'delete': function(sbv){
            return $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                url: '/api/sbv/' + sbv._id
            });
        }
    };
});
