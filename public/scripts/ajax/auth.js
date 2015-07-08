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
        }
    };
});
