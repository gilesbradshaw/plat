'use strict';

//products cieww model fetches a list of produ7cts

define([
        'ajax',
        'knockout',
        'app.platinum.product'
    ], function(ajax, ko, Product){
    var viewModel = function(type){
        this.type = type;
        this.products = ko.observableArray();
        this.product = new Product();
        this.getProducts();
    };
    viewModel.prototype.getProducts = function(){
        var self = this;
        ajax.products.post(this.type).then(function(data){
             self.products(data);
        });
    };
    return viewModel;
});
