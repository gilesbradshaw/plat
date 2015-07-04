'use strict';

//product component view model gets new product when selected product changes

define([
    'ajax',
    'knockout'
], function(ajax, ko){
   return function(params){
        var self = this;
        this.params = params;
        this.product = ko.observable();
        this.items = ko.observableArray();
        this.parameters = ko.observableArray();
        this.getProduct = function(product){
            return function(){
                ajax.product.post(product).then(function(data){
                    self.items(data);
                });
            };
        };
        this.getParameters = function(product){
            return function(){
                ajax.parameters.list(product).then(function(data){
                    self.parameters(data);
                });
            };
        };
        this.product.subscribe(function(product){
            self.getParameters(product)();
        });
   };
});
