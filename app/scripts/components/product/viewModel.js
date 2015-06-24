'use strict';
define(['knockout'], function(ko){
   return function(params){
        //var self = this;
        this.params = params;
        this.product = ko.observable();
        this.product.subscribe(function(product){
            params.getProduct(product);
        });
   };
});
