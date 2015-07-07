'use strict';

//product component view model gets new product when selected product changes

define(['knockout'], function(ko){
   return function(params){
        var self = this;
        this.params = params;
        this.category = ko.observable();
        this.products = ko.pureComputed(
            function(){
                return params.products().filter(function(p){
                    return p.category === self.category();
                });
            }
        );
   };
});
