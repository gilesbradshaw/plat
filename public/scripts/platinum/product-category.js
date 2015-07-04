'use strict';

//products cieww model fetches a list of produ7cts

define([
       'knockout'
    ], function(ko){
    var viewModel = function(category, products){
        this.category = category;
        this.products = ko.pureComputed(
            function(){
                return products().filter(function(p){
                    return p.category === category;
                });
            }
        );
        //this.product = new Product();
    };
    return viewModel;
});
