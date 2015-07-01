'use strict';
//headings view model - fetches headings for products - what each row represents.

define([
    'jquery'
], function($){
    return {
        sbv: {
            get: function(sbvid){
                return $.ajax({
                    method: 'GET',
                    contentType: 'application/json',
                    url: '/api/posts'
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
            }
        },
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
            post: function(type){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(type),
                    url: '/products/' + type
                });

            }
        },
        product: {
            post: function(product){
                return $.ajax({
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(product),
                    url: '/product'
                });

            }
        }
    };
});
