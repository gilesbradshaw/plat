'use strict';

//products cieww model fetches a list of produ7cts

define(['ajax', 'knockout'], function(ajax, ko){
    var viewModel = function(type){
        this.type = type;
        this.products = ko.observableArray();
        this.product = ko.observableArray();
        this.getProducts();
    };
    viewModel.prototype.getProducts = function(){
        var self = this;
        ajax.products.post(this.type).then(function(data){
             self.products(data);
        });
    };
    viewModel.prototype.getProduct = function(product){
        var self = this;
        return function(){
            ajax.product.post(product).then(function(data){
                self.product(data);
            });
        };
    };
    return viewModel;
});
