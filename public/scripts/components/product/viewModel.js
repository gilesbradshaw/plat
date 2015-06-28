'use strict';

//product component view model gets new product when selected product changes

define(['knockout'], function(ko){
   return function(params){
        this.params = params;
        this.product = ko.observable();
        this.product.subscribe(function(product){
            params.getProduct(product)();
        });
   };
});
