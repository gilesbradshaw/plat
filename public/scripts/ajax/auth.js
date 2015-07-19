'use strict';
//headings view model - fetches headings for products - what each row represents.

define([
    'jquery'
], function($){
    return {
        signin: function(username, password){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                url: '/auth/signin'
            });
        },
        signout: function(){
            return $.ajax({
                method: 'GET',
                url: '/auth/signout'
            });
        },
        get: function(){
            return $.ajax({
                method: 'GET',
                //contentType: 'application/json',
                url: '/auth/me'
            });
        }
    };
});
